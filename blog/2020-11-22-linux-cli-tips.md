---
id: linux-cli-tips
title: Linux CLI Tips
author: samundrak
author_title: JavaScript Dev
author_url: https://github.com/samundrak
author_image_url: 
 https://avatars1.githubusercontent.com/u/3079452?s=460&u=e5bd48488cb71b665ea5403192c6b8a963644a08&v=4
tags: [linux, cli]
---

- A single dash normally means a short name of the flag. E.g ls -a

- A double dash is passed to express a long flag. Ex: ls -all

<!-- truncate -->

- A single dash can also handle multiple short flags passed into it. Ex. ls -alR
- Use the command `less <filename>` to output less information of a file
- Use the command `more <filename` to output more information if a file
- Use key `Ctrl + A` to go to the beginning of any written text in bash
- Use key `ctrl+ E` to go to the end of any written text in bash that is currently present.
- Use key `ctrl +d ` to send a sign to terminate, use the command `kill -l` to see all commands that can be used to kill, terminate, interrupt processes, and many more.
- When we press key `ctrl +r` then it will help us to go through history and find the matching last command. If we want to go through all matching command then keep pressing `ctrl +r`
- `tail` helps us to see the last 10 lines of content from the source and the head can show us the first 10 lines. Seeing 10 lines is configurable and we can see the `-f` flag to not let the command exit and just keep showing us the update.
- `mkdir -p /nested/folder/can/be/created` mkdir is used to create a folder but if we try to create nested then we will see some error just pass `-p` flag to make a nested folder in a single line of command
- There’s a cli lib `trash` which can help us to manage trash via CLI. For example: `trash-put filename`
- `tar -cf pkg.tar package.json package-lock.json` to archive file `pkg.tar` here can be any desired output filename and the rest of the files after it is to be archived inside it. To compress it change flag `-cf` to `-cfz` and also change the extension of the output filename to `.tar.gz`. This will actually compress our file and we can see some difference in size.
- To unarchive any tar file just do this `tar -xzf filena.tar.gz destinationFolder`.
