---
title: Combining and Cutting Shapes
description: Learn how AniCraft uses automatic boolean operations to sculpt shapes.
---

"Boolean" is a computer graphics term that refers to shapes or objects combining with, intersecting, or excluding each other.

AniCraft performs automatic boolean operations based on certain rules. 


# **Rule #1: Same colours combine.**
![](/assets/uploads/combine1.png)

![](/assets/uploads/combine2.png)

When two fill shapes with the same colour overlap, they combine to form one shape.

# Rule #2: Different colours subtract.

![](/assets/uploads/subtract1.png)

![](/assets/uploads/subtract2.png)

![](/assets/uploads/subtract3.png)

When a fill shape with one colour overlaps a fill shape with a different colour, it "takes a bite" out of the other shape.

# Rule #3: Strokes cut fills.


![](/assets/uploads/cutShapes1.png)

![](/assets/uploads/cutShapes2.png)

![](/assets/uploads/cutShapes3.png)

A stroke line will carve, or cut, a fill into separate pieces.

The first two rules hold true with strokes: same-coloured strokes combine, while differently-coloured strokes cut each other.



# Protecting Shapes


Sometimes you want your artwork to be "protected" so that your shapes don't interfere with each other. There are several different ways to accomplish this:

- Drawing Objects
- Groups
- Symbols
