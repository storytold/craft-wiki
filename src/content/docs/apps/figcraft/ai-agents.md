---
title: AI agents
description: Let Claude or another AI assistant design with FigCraft through its MCP server, and script FigCraft from the command line.
sidebar:
  order: 5
---

Every menu item, tool and drag in FigCraft runs a command, and AI assistants can run the same commands. Any assistant that supports the [Model Context Protocol](https://modelcontextprotocol.io) (MCP) can create and edit layers, run menu commands, inspect the result and look at it as an image.

:::tip[New to this?]
[Connect an AI assistant](/apps/connect-ai/overview/) walks you through it step by step.
:::

## Get the command-line tool

Assistants talk to FigCraft through its command-line tool, `figcraft-cli`:

- **Windows**: `figcraft-cli.exe` is next to `figcraft.exe` in the install folder or portable zip.
- **macOS**: download `figcraft-cli-<ver>-macos-universal.zip` from the [release page](https://github.com/storytold/figcraft/releases/latest).
- **Linux `.deb`, `.rpm`, `.pkg.tar.zst`, tarball, and FreeBSD**: it's installed alongside the app.
- **AppImage**: run it as `/path/to/FigCraft.AppImage cli`, so `figcraft-cli mcp` becomes `/path/to/FigCraft.AppImage cli mcp`.
- **Flatpak**: run it as `flatpak run --command=figcraft-cli ai.storyteller.figcraft`.

If the assistant can't find `figcraft-cli`, use its full path, for example `C:\Users\you\AppData\Local\Programs\ArtCraft\FigCraft\figcraft-cli.exe`. Desktop apps often need the full path even when your terminal doesn't.

## Connect your assistant

Every assistant starts FigCraft with the same command: `figcraft-cli mcp`. FigCraft then works in the background, with no window.

### Claude Code

```bash
claude mcp add figcraft -- figcraft-cli mcp
```

### Claude Desktop

Choose **Settings › Developer › Edit Config**, add FigCraft to `claude_desktop_config.json`, then restart Claude:

```json
{
  "mcpServers": {
    "figcraft": {
      "command": "figcraft-cli",
      "args": ["mcp"]
    }
  }
}
```

### Other assistants

Look for "MCP servers" in your assistant's settings and add a local (stdio) server with the command `figcraft-cli` and the argument `mcp`.

## Ask for a design

Once connected, ask in plain words, for example *"Make a sign-in screen for a phone, with auto layout, and save it as signin.figcraft"*. The assistant can also start from one of the built-in templates.

## Watch it work in the app

To see the assistant's changes as it makes them, start FigCraft with its control port open:

```bash
figcraft --control 7979
```

Then use `figcraft-cli mcp --attach 7979` as the assistant's command. The assistant appears in the app like a person in a live session, with its own avatar, and FigCraft outlines the layers it just changed. The control port only accepts connections from your own computer.

## Keep the assistant to certain folders

To stop a background assistant reading or writing files outside one folder, add a read folder and a write folder after `figcraft-cli mcp`:

```bash
figcraft-cli mcp --automation-read-root ~/Designs/project --automation-write-root ~/Designs/project/out
```

In a JSON config, put each flag and folder in `args`, with full paths, since `~` isn't expanded there:

```json
"args": ["mcp", "--automation-read-root", "/Users/you/Designs/project",
         "--automation-write-root", "/Users/you/Designs/project/out"]
```

The assistant can then only open files inside the read folder, and only save inside the write folder. Leave out the write folder and it can't save to disk at all.

These flags don't go with `--attach`. To limit an assistant working in the app, start the app itself with them: `figcraft --control 7979 --automation-read-root … --automation-write-root …`.

## Use it in the web version

The web version can't run `figcraft-cli`, so the setups above don't reach it. Since version 0.12, it gives the page a JavaScript API instead, `window.figcraft`, with the same commands. An assistant that can run JavaScript in your browser tab can use it, for example one in a browser extension that runs its script in the page itself. The API is off until you ask for it: add `control` to the web page's address, as `?control`, or `&control` if the address already has a `?`.

```js
await figcraft.commands(); // every command FigCraft has
await figcraft.execute("node.create", { type: "frame", name: "Home", width: 390, height: 844 });
const shot = await figcraft.screenshot(); // the canvas as a PNG, as base64
```

`await figcraft.inspect()` describes the document.

A few things to know:

- **Turn it on.** Without `control` in the address, `window.figcraft` doesn't exist. After you add it, reload the page, then wait until `window.figcraft` exists before calling anything.
- **Where it lives.** `window.figcraft` belongs to the page that runs FigCraft. If FigCraft is in a frame, run the script in that frame.
- **Opening a file.** Pass the file's name and its bytes, as a `Uint8Array`: `await figcraft.openFile("home.figcraft", bytes)`.
- **Saving.** Saves and exports download as usual. Call `figcraft.captureDownloads(true)` first to keep them in the page instead. `figcraft.files()` then lists them, with their sizes, and `await figcraft.readFile("home.figcraft")` returns a file's bytes. The page keeps the 16 most recent.
- **Keep the tab visible.** FigCraft answers each call on its next frame. In a hidden tab, a call waits until the tab is shown again. Since version 0.17, a call that isn't answered within 30 seconds fails, and FigCraft drops it unrun if it hadn't started it.
- **Any script can use it.** Any script running on the page can use `window.figcraft`, the same as the page's own scripts.

## From the command line

`figcraft-cli` also works on its own, without an assistant:

```bash
figcraft-cli render landing.figcraft -o landing.png --scale 2   # render a page as an image
figcraft-cli export landing.figcraft -o out/ --format svg       # export each top-level frame
figcraft-cli convert design.fig design.figcraft                 # convert by file extension
figcraft-cli commands --filter autoLayout                       # list commands and their parameters
```

For scripting FigCraft's commands, see the [developer documentation on GitHub](https://github.com/storytold/figcraft/blob/main/docs/cli.md).
