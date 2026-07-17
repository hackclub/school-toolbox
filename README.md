<p align="center"><img width="192" alt="Hack Club logo" src="https://assets.hackclub.com/flag-standalone.svg"></p>
<h1 align="center"><a href="https://school-toolbox.hackclub.dev/">Hack Club's School Toolbox</a></h1>

Notes on running a club for Hack Club leaders and school administrators - powered by [Next.js], [Theme UI] & [MDX].

## Writing your own letters

Wanna write a letter to school admins? First, find the category related to the letter you wanna write. If you want to make a category, scroll down to the Creating a category section :p

Then, make a .mdx file in that folder, with the name of your letter, like `lynns-letter.mdx`. In that letter, you should start by putting the following:
```
---
title: Orpheus's Email      # This is where you should put the title of your letter
author: Orpheus     # This is where you should put your name!
authorLink: https://hackclub.com        # This is where you should put your website. Optional, but always recommended.
description: I am orpheus!      # A brief description of your article. Don't spend too much time on this lol
---
```

When you're done writing, make a PR. It should be approved quickly, but if not, please poke in #leaders.

## Development

Download the code to your computer:

    $ git clone https://github.com/hackclub/school-toolbox && cd school-toolbox

Install dependencies:

    $ yarn

Start running the website on your computer:

    $ yarn run dev

And then open up your web browser and go to [localhost:3000](http://localhost:3000).

[next.js]: https://nextjs.org
[mdx]: https://mdxjs.com
[theme ui]: http://theme-ui.com
