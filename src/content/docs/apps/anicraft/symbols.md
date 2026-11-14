---
title: Symbols
description: Understanding the basics of Symbols in AniCraft.
---

A Symbol is a piece of artwork that is "protected" from automatic boolean operations. When you convert artwork into a Symbol, it is added to your project's Library. It becomes a reusable element, like a rubber stamp, that you can use again and again.

Converting artwork into Symbols is an important first step to creating Keyframe Animations.

The three types of Symbols in AniCraft are

- Graphic
- MovieClip
- Button

We'll focus on the Graphic Symbol type for now, since it's the simplest.

# Converting Artwork to a Symbol

To convert your artwork to a symbol, first select it.

![](/assets/uploads/redBox.png)

Then, either:

- Press F8
- Right-click and choose Convert to Symbol from the context menu
- Choose Modify > Convert to Symbol in the menu

![](/assets/uploads/convertToSymbol.png)

AniCraft will ask you to type a name for your Symbol, choose which kind of Symbol you want it to be, and select a folder location for it in your Library. For now, let's just type a name for it and keep the other two options on their default settings. Click OK.

![](/assets/uploads/nameSymbol.png)

Now, when our Symbol overlaps Shapes of the same or different colours, it doesn't [combine with them or subtract from them](combining-and-cutting-shapes).

![](/assets/uploads/noAutoBoolean1.png)

![](/assets/uploads/noAutoBoolean2.png)

# Creating Instances

You can click and drag multiple copies of your Symbol from the Library to the Stage. 

![](/assets/uploads/library1.png)

![](/assets/uploads/instances1.png)

Each one of these is called an _Instance_ of our Symbol.

![](/assets/uploads/instances2.png)

Each Symbol Instance has its own Transform. So we can change the position, rotation, scale, and colour effect of each Symbol separately.

# Modifying a Symbol

![](/assets/uploads/breadcrumbs.png)

We can double-click a Symbol to go "inside" it. The breadcrumb trail at the top of the Stage shows us that we are now working within the Symbol.

![](/assets/uploads/changes.png)

If we make changes inside our Symbol, that change happens to all of the other Instances of the Symbol.

Next: [The Timeline](the-timeline)
