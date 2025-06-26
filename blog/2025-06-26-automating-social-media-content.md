---
title: Automating Social Media: A Deep Dive into the socialcontentmanager Module
slug: automating-social-media-socialcontentmanager
date: 2025-06-26
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [fullstack, nestjs, react, data-visualization, nepal, politics, elections, prisma, docusaurus]
sidebar_position: 1
---

  In today's digital landscape, maintaining a consistent and engaging social media presence is crucial for any organization. For projects dealing with dynamic data, manual posting can quickly become overwhelming. This is
  where automated social media management systems shine. This article explores the architecture and implementation of a socialcontentmanager module, a robust system designed to automate content generation and posting
  across various social media platforms, with a focus on Facebook and X (formerly Twitter).

  The Core Concept: Modular Content Generation


  At the heart of our socialcontentmanager module is a highly modular approach to content generation. Instead of hardcoding specific post types, we leverage an interface-driven design. This allows us to define a contract
  for what a "social media content" should be, and then implement various content types as separate, independent classes. This approach promotes reusability, scalability, and maintainability.

  The ISocialMediaContent Interface


  The ISocialMediaContent interface defines the fundamental structure and behavior expected from any content type within our system. It ensures that each content class can provide the necessary information (text, image,
  comments) for a social media post.
<!--truncate-->


    1 // apps/api/src/socialcontentmanager/contents/ISocialMediaContent.ts
    2 export interface ISocialMediaContentResponse {
    3   content: string;
    4   image?: string;
    5   comment?: string;
    6 }
    7 
    8 export type ISocialMediaContentResponseType = Promise<
    9   ISocialMediaContentResponse[] | null
   10 >;
   11 
   12 export abstract class ISocialMediaContent {
   13   (protected params: ISocialMediaContentParams) {}
   14   c
   15   abstract getContent(
   16     options?: ISocialMediaContentResponseOptions,
   17   ): ISocialMediaContentResponseType;
   18   t
   19   getRecords(options?: ISocialMediaContentResponseOptions): Promise<any[]> {
   20     return Promise.resolve([]);
   21   }
   22   t
   23   getContentsFromRecords(
   24     records: any[],
   25     options?: ISocialMediaContentResponseOptions,
   26   ): ISocialMediaContentResponseType {
   27     return Promise.resolve([]);
   28   }
   29 }



  The ISocialMediaContentResponse interface specifies the expected output from a content generator: content (the main text of the post), an optional image URL, and an optional comment for replies or additional context.
  The getContent method, which all concrete content classes must implement, is responsible for fetching data and formatting it into the ISocialMediaContentResponse structure.

  Defining Content Types with SocialMediaContentTypeEnum

  To categorize and easily reference different content types, we use an enum:



   1 // apps/api/src/socialcontentmanager/contents/SocialMediaContentTypeEnum.ts
   2 export enum SocialMediaContentTypeEnum {
   3   BIRTHDAY_POST = 'BIRTHDAY_POST',
   4   ANNIVERSARY_PARTIES = 'ANNIVERSARY_PARTIES',
   5   ANNIVERSARY_GOVERNMENTS = 'ANNIVERSARY_GOVERNMENTS',
   6   // ... other content types
   7   RANDOM_ELECTION_RESULTS = 'RANDOM_ELECTION_RESULTS',
   8   RECENTLY_ADDED_CONTENTS = 'RECENTLY_ADDED_CONTENTS',
   9 }


  Example: The BirthdayPost Content Generator


  Let's look at a concrete example: the BirthdayPost class. This class is responsible for generating birthday greetings for leaders, complete with their details and a relevant image.



    1 // apps/api/src/socialcontentmanager/contents/birthday-post.ts
    2 import { getImageUrlWithFallback } from "src/utils";
    3 import { ISocialMediaContent, ISocialMediaContentResponseOptions, ISocialMediaContentResponseType, } from "./ISocialMediaContent"
    4 import { SocialMediaContentTypeEnum } from "./SocialMediaContentTypeEnum"
    5 
    6 export class BirthdayPost extends ISocialMediaContent {
    7 
    8     static contentName = SocialMediaContentTypeEnum.BIRTHDAY_POST
    9 
   10     async getRecords(options?: ISocialMediaContentResponseOptions): Promise<any[]> {
   11         const today = new Date();
   12         const month = today.getMonth() + 1;
   13         const day = today.getDate();
   14         const records = await this.params.leaders.getBirthdayLeadersRaw();
   15         return Array.isArray(records) ? records : [];
   16     }
   17 
   18     async getContent(): ISocialMediaContentResponseType {
   19         const today = new Date();
   20         const month = today.getMonth() + 1;
   21         const day = today.getDate();
   22 
   23         const leaders = await this.params.leaders.getBirthdayLeadersRaw()
   24         //@ts-expect-error
   25         const contents = leaders.map((item: any) => {
   26             return {
   27                 comment: `Read more about ${item.localName} on Nepal Tracks - https://www.nepaltracks.com/leaders/${item.id}`,
   28                 image: getImageUrlWithFallback(item.img, item.ecCandidateID),
   29                 content: `
   30                 🎉 जन्मदिनको शुभकामना 🎉
   31 
   32 आज ${month} -${day} जन्मदिन मनाउँदै हुनुहुन्छ:
   33 🇳🇵 ${itelocalName} ${item.partyShortName}
   34 
   35  ${item.address ? `📍 स्था${item.address}` : ''}
   36  ${item.nameOfInst ? `🎓 शिक्${item.nameOfInst}` : ''}
   37  ${item.metadata.fatherName ? `👨‍👩‍👧${item.metadata.fatherName}` : ''}
   38  ${item.metadata.spouseName ? `👫 जीवनसाथ${item.metadata.spouseName}` : ''}
   39 
   40 राजनीतिक योगदानका लागि धन्यवाद। तपाईंको दीर्घायु र सफल जीवनको कामना! 🙏
   41 
   42 
   43 
   44 🎉 Happy Birthday 🎉
   45 
   46 Celebrating the birthday today, ${month} -${day}:
   47 🇳🇵 ${itename} ${item.name}
   48 
   49 ${item.address ? `📍 place: ${item.address}` : ''}
   50 ${item.nameOfInst ? `🎓 Education: ${item.nameOfInst}` : ''}
   51 ${item.metadata.fatherName ? `👨‍👩‍👧‍👦${item.metadata.fatherName}` : ''}
   52 ${item.metadata.spouseName ? `👫 Spouse:  ${item.metadata.spouseName}` : ''}
   53 
   54 Thank you for your political contributions. Wishing you long life and continued success! 🙏
   55 
   56 #HappyBirthday #NepalTracks #RajnitiReport
   57 `
   58             }
   59         })
   60         return contents
   61     }
   62 }



  The BirthdayPost class extends ISocialMediaContent and implements the getContent method. It fetches birthday leaders using this.params.leaders.getBirthdayLeadersRaw() (injected via dependency injection) and then
  formats the content and image URL. Notice how the comment field is used to provide a "Read more" link, which can be posted as a reply or a separate comment.

  Platform Integration: Facebook and X (Twitter)


  The SocialContentManagerService acts as the central orchestrator, taking the generated content and posting it to the configured social media platforms.

  Facebook Integration

  Facebook integration involves using the Facebook Graph API. Our service handles both text-only posts and posts with images, as well as adding comments.

  Setting up Facebook API Access


  To interact with the Facebook Graph API, you need:
   * App ID: Your Facebook Application ID.
   * Page Access Token: A long-lived access token for your Facebook Page. This token grants your application permission to post on behalf of your page.

  These credentials are securely stored and retrieved using a ConfigService.


  Posting to Facebook

  The postToFacebook method handles simple text posts:



    1 // apps/api/src/socialcontentmanager/socialcontentmanager.service.ts
    2 async postToFacebook(message: string): Promise<any> {
    3   try {
    4     const url = `https://graph.facebook.com/v19.0/${this.configService.getOrThrow(
    5       'APP_FACEBOOK_PAGE_ID',
    6     )}/feed`;
    7 
    8     const { data } = await axios.post(url, null, {
    9       params: {
   10         message: 'from tjhe api', // This should be the actual message
   11         access_token: this.configService.getOrThrow(
   12           'APP_FACEBOOK_PAGE_ACCESS_TOKEN',
   13         ),
   14       },
   15     });
   16 
   17     this.logger.log(`Posted to Facebook: ${JSON.stringify(data)}`);
   18     return data;
   19   } catch (error) {
   20     this.logger.error(
   21       'Failed to post to Facebook',
   22       error?.response?.data || error.message,
   23     );
   24     throw error;
   25   }
   26 }



  Posting Images to Facebook

  Posting images requires a two-step process: first, uploading the image, and then creating a post that attaches the uploaded image. Our system supports multiple images per post.



    1 // apps/api/src/socialcontentmanager/socialcontentmanager.service.ts
    2 async postToFacebookWithImage({
    3   image,
    4   content,
    5 }: ISocialMediaContentResponse): Promise<any> {
    6   try {
    7     let photoUploadResponse, photoId;
    8     const photoIds: string[] = [];
    9     if (image) {
   10       try {
   11         const images = image.split(',');
   12 
   13         for (const img of images) {
   14           const photoUploadUrl = `https://graph.facebook.com/v19.0/${this.configService.getOrThrow(
   15             'APP_FACEBOOK_PAGE_ID',
   16           )}/photos`;
   17 
   18           const photoUploadResponse = await axios.post(photoUploadUrl, null, {
   19             params: {
   20               url: img,
   21               published: false, // Set to false to attach to a post later
   22               access_token: this.configService.getOrThrow(
   23                 'APP_FACEBOOK_PAGE_ACCESS_TOKEN',
   24               ),
   25             },
   26           });
   27 
   28           photoIds.push(photoUploadResponse.data.id);
   29         }
   30       } catch (e) {
   31         console.log(e);
   32       }
   33     }
   34     // Step 2: Create post with attached photo
   35     const postUrl = `https://graph.facebook.com/v19.0/${this.configService.getOrThrow(
   36       'APP_FACEBOOK_PAGE_ID',
   37     )}/feed`;
   38     const postResponse = await axios.post(postUrl, null, {
   39       params: {
   40         message: content,
   41         attached_media:
   42           image && photoIds.length
   43             ? JSON.stringify(photoIds.map((id) => ({ media_fbid: id })))
   44             : undefined,
   45         access_token: this.configService.getOrThrow(
   46           'APP_FACEBOOK_PAGE_ACCESS_TOKEN',
   47         ),
   48       },
   49     });
   50 
   51     this.logger.log(
   52       `Posted image to Facebook: ${JSON.stringify(postResponse.data)}`,
   53     );
   54     return postResponse.data;
   55   } catch (error) {
   56     this.logger.error(
   57       'Failed to post image to Facebook',
   58       error?.response?.data || error.message,
   59     );
   60     throw error;
   61   }
   62 }


  Adding Comments to Facebook Posts


  To add a comment to an existing post, we use the post's ID:



    1 // apps/api/src/socialcontentmanager/socialcontentmanager.service.ts
    2 async postComment(postId, commentText) {
    3   const url = `https://graph.facebook.com/${postId}/comments?message=${encodeURIComponent(
    4     commentText,
    5   )}&access_token=${this.configService.getOrThrow(
    6     'APP_FACEBOOK_PAGE_ACCESS_TOKEN',
    7   )}`;
    8 
    9   // Make a POST request to Facebook Graph API
   10   const response = await fetch(url, {
   11     method: 'POST',
   12   });
   13 
   14   const data = await response.json();
   15   if (data.error) {
   16     console.error('Error posting comment:', data.error);
   17   } else {
   18     console.log('Successfully posted comment:', data);
   19   }
   20 }


  X (Twitter) Integration


  Twitter integration uses the twitter-api-v2 library, which simplifies interactions with the Twitter API.

  Setting up X (Twitter) API Access


  For Twitter, you'll need:
   * App Key (Consumer Key)
   * App Secret (Consumer Secret)
   * Access Token
   * Access Secret

  These are obtained from your Twitter Developer account and are used to initialize the TwitterApi client.



   1 // apps/api/src/socialcontentmanager/socialcontentmanager.service.ts
   2 // ... inside constructor
   3 this.twitterClient = new TwitterApi({
   4   appKey: this.configService.getOrThrow('TWITTER_API_KEY'),
   5   appSecret: this.configService.getOrThrow('TWITTER_API_SECRET'),
   6   accessToken: this.configService.getOrThrow('TWITTER_ACCESS_TOKEN'),
   7   accessSecret: this.configService.getOrThrow('TWITTER_ACCESS_SECRET'),
   8 });


  Posting to X (Twitter)

  The postToTwitter method handles both text and image posts, and crucially, manages replies to create threads.



    1 // apps/api/src/socialcontentmanager/socialcontentmanager.service.ts
    2 async postToTwitter(
    3   post: ISocialMediaContentResponse,
    4   in_reply_to_status_id?: string,
    5 ) {
    6   try {
    7     const { content: tweetText, image: mediaUrl, comment } = post;
    8     const texts = tweetText.split('\n');
    9     const hashtags = texts.pop(); // Assuming hashtags are the last line
   10     const maxTweetLength = 280;
   11     const separator = '\n';
   12     const reservedLength = hashtags.length + separator.length + 3; // 3 for the ellipsis
   13     // Trim the tweet text to make room for ellipsis and hashtags
   14     const trimmedTweet = tweetText.slice(0, maxTweetLength - reservedLength);
   15 
   16     // Add ellipsis and then the hashtags
   17     let text = in_reply_to_status_id
   18       ? tweetText
   19       : trimmedTweet +
   20         (in_reply_to_status_id ? '' : '...') +
   21         separator +
   22         hashtags;
   23     const images = mediaUrl?.split(',') || [];
   24 
   25     let mediaIds = [];
   26     if (images.length) {
   27       for (const img of images) {
   28         try {
   29           const response = await axios.get(img, {
   30             responseType: 'arraybuffer',
   31           });
   32 
   33           const mediaBuffer = Buffer.from(response.data, 'binary');
   34 
   35           const mediaId = await this.twitterClient.v1.uploadMedia(
   36             mediaBuffer,
   37             {
   38               type: 'jpg', // Change to 'png' or 'gif' based on the file type
   39             },
   40           );
   41           mediaIds.push(mediaId);
   42         } catch (err) {
   43           console.log(err);
   44         }
   45       }
   46     }
   47 
   48     const response = await this.twitterClient.v2.tweet(
   49       truncate(text, { length: 280 }), // Ensure tweet is within 280 characters
   50       {
   51         media: mediaIds.length
   52           ? {
   53               media_ids: mediaIds.slice(0, 4) as // Twitter allows up to 4 images
   54                 | [string]
   55                 | [string, string]
   56                 | [string, string, string]
   57                 | [string, string, string, string],
   58             }
   59           : undefined,
   60         reply: in_reply_to_status_id && {
   61           in_reply_to_tweet_id: in_reply_to_status_id,
   62         },
   63       },
   64     );
   65     if (!in_reply_to_status_id) {
   66       // If it's the initial tweet, post the comment as a reply
   67       await this.postToTwitter({ content: post.comment }, response.data.id);
   68     }
   69     console.log('Tweet posted:', response);
   70   } catch (err) {
   71     console.error('Error posting tweet:', err);
   72   }
   73 }


  X (Twitter) API Limitations (Free Tier)


  It's important to be aware of the limitations of the Twitter API, especially on the free tier. These can include:
   * Rate Limits: Restrictions on the number of requests you can make within a certain time frame. Exceeding these limits will result in temporary blocks.
   * Access to Endpoints: Certain advanced features or data access might be restricted to higher tiers.
   * Tweet Length: The classic 280-character limit per tweet. Our truncate function helps manage this.
   * Media Attachments: A limit of 4 images per tweet.

  Always consult the official Twitter Developer documentation for the most up-to-date information on API access and limitations.

  Scheduling and Automation


  The socialcontentmanager module facilitates basic scheduling by introducing delays between posts, ensuring that multiple generated contents are not posted simultaneously. For more advanced scheduling (e.g., posting at
  specific times of day), this system would typically integrate with a cron job scheduler or a message queue.



    1 // apps/api/src/socialcontentmanager/socialcontentmanager.service.ts
    2 async post(type: SocialMediaContentTypeEnum) {
    3   const contents = await this.getContentsByType(type);
    4   const responses = [];
    5   for (let i = 0; i < contents.length; i++) {
    6     // Introduce delay for each post
    7     const item = contents[i];
    8     const delayMs = i * 60000; // Increment delay for each post (1 minute)
    9     responses.push(this.postWithDelay(item, delayMs));
   10   }
   11 
   12   const d = await Promise.all(responses); // Wait for all posts to complete
   13 
   14   return d;
   15 }
   16 
   17 async postWithDelay(post: ISocialMediaContentResponse, delayMs = 180000) { // Default 3 minutes
   18   // Wait for the delay before posting
   19   await this.delay(delayMs);
   20   // Now post to Facebook with image and content
   21   const response = await this.postToFacebookWithImage(post);
   22   if (post.comment) {
   23     await this.postComment(response.id, post.comment);
   24   }
   25   await this.postToTwitter(post);
   26   return response;
   27 }
   28 
   29 delay(ms) {
   30   return new Promise((resolve) => setTimeout(resolve, ms));
   31 }


  The post method iterates through generated content, and postWithDelay introduces a configurable delay before actually sending the post to Facebook and Twitter. This simple mechanism prevents overwhelming social media
  feeds with a burst of posts.

  Code Structure and Best Practices

  The socialcontentmanager module exemplifies several best practices in software engineering:


   * Dependency Injection: The SocialContentManagerService constructor injects various services (e.g., LeadersService, PrismaService, AiService). This promotes loose coupling, making the code easier to test and maintain.
     Each content class also receives these services through its constructor, allowing it to fetch necessary data.
   * Interface-Driven Design: The ISocialMediaContent interface is a cornerstone of this module's flexibility. It allows for easy addition of new content types without modifying existing posting logic.
   * Separation of Concerns: Content generation logic is encapsulated within individual content classes (e.g., BirthdayPost), while the SocialContentManagerService focuses solely on orchestrating the posting process.
   * Configuration Management: API keys and other sensitive information are managed through a ConfigService, ensuring they are not hardcoded and can be easily updated or managed in different environments.
   * Error Handling and Logging: The module includes basic error handling for API calls and uses a Logger for tracking activity and debugging.

  Conclusion


  The socialcontentmanager module provides a robust and extensible framework for automating social media posting. By embracing modular content generation, clear platform integrations, and adherence to best practices,
  this system can significantly streamline social media management for data-driven applications. This approach not only saves time but also ensures a consistent and engaging online presence, allowing organizations to
  focus on generating valuable content rather than the mechanics of its distribution.

