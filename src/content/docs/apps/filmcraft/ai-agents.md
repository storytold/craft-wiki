---
title: AI agents
description: Let Claude or another AI assistant cut, grade, mix and export in FilmCraft over MCP.
sidebar:
  order: 4
---

Everything you can do in FilmCraft's menus, buttons and sliders is a command. An AI assistant can run the same commands through FilmCraft's MCP server, so it can cut, trim, grade, mix and export a sequence the way you would. Any assistant that supports MCP (the Model Context Protocol) works, such as Claude Code.

:::tip[New to this?]
[Connect an AI assistant](/apps/connect-ai/overview/) walks you through it step by step.
:::

The MCP server is part of `filmcraft-cli`, FilmCraft's command-line tool.

## Find filmcraft-cli

| Install | Where it is |
| --- | --- |
| Windows installer | `%LOCALAPPDATA%\Programs\ArtCraft\FilmCraft\filmcraft-cli.exe` (or `C:\Program Files\ArtCraft\FilmCraft\` if you installed for everyone). It isn't on your `PATH`. |
| Linux `.deb` or `.rpm` | `/usr/bin/filmcraft-cli` |
| macOS | A separate download: `filmcraft-cli-<ver>-macos-universal.zip` on the [release page](https://github.com/storytold/filmcraft/releases/latest) |

Use the CLI from the same release as the app.

## Without a window

In this mode the assistant works on a project without FilmCraft open. Add the server to Claude Code like this:

```bash
claude mcp add filmcraft -- filmcraft-cli mcp --project /path/to/film.fcproj
```

On Windows, give the full path to `filmcraft-cli.exe`. Leave out `--project` to start with an empty project, or use `--demo` to try it on the demo project.

The server doesn't save by itself: ask the assistant to save the project when it's done. Don't have the same project open in FilmCraft at the same time. Whichever saves last replaces the other's work.

:::caution
The MCP server can read and write any file your account can. Only connect assistants you trust, and keep a copy of important projects.
:::

## With the app open

The assistant can also drive the FilmCraft window you are looking at, and take screenshots of it. This needs a private token that FilmCraft and the assistant share:

1. Make a token of 64 random hexadecimal characters, and put it in the `FILMCRAFT_CONTROL_TOKEN` environment variable.
2. From that same terminal, start FilmCraft with `filmcraft --control 9876`.
3. Connect the assistant with `filmcraft-cli mcp --bridge 127.0.0.1:9876`, started from an environment that has the same token.

FilmCraft only listens on your own computer, and only with a valid token. Make a new token for each session, and don't save it in shared files.

## Use it in the web version

The web version can't run `filmcraft-cli`, so the setups above don't reach it. Since version 0.19, it gives the page a JavaScript API instead, `window.filmcraft`, with the same commands. An assistant that can run JavaScript in your browser tab can use it, for example one in a browser extension that runs its script in the page itself. There's nothing to switch on.

```js
await filmcraft.commands(); // every command FilmCraft has
await filmcraft.request("ui.playback", { action: "play" });
const shot = await filmcraft.screenshot(); // the canvas as a PNG, as base64
```

`await filmcraft.inspect()` describes the window.

A few things to know:

- **Wait for it to load.** `window.filmcraft` appears a moment before FilmCraft is ready, and a call made then fails with "FilmCraft is not running yet". Wait until `window.filmcraftLoad.readyMs` has a value before calling anything.
- **Where it lives.** `window.filmcraft` belongs to the page that runs FilmCraft. If FilmCraft is in a frame, run the script in that frame.
- **Opening files.** `await filmcraft.importFiles(files)` imports `File` objects: one `File`, a `FileList` or an array of them. `await filmcraft.openProject(file)` opens a `.fcproj` file.
- **Reading results.** Files FilmCraft writes, such as an export, are kept in the page. `filmcraft.files()` lists them, with their sizes, and `await filmcraft.readFile("/exports/out.mp4")` returns a file's bytes.
- **Keep the tab visible.** FilmCraft answers each call on its next frame, and a browser can pause frames in a hidden tab. A call that isn't answered within 30 seconds fails, but FilmCraft may still run it later.
- **Any script can use it.** Any script running on the page can use `window.filmcraft`, the same as the page's own scripts.

## Good to know

- Edits made by an assistant can be undone like your own.
- The full list of commands is in `filmcraft-cli commands`.
- The technical reference is in FilmCraft's [agents guide](https://github.com/storytold/filmcraft/blob/main/docs/agents.md) and [control protocol](https://github.com/storytold/filmcraft/blob/main/docs/control-protocol.md).
