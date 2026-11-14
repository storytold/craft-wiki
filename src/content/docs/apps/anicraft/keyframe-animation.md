---
title: Keyframe Animation
description: Learn the basics of keyframe animation and interpolation
---

In classical animation, an animation Director draws a character in a series of poses, called "key" poses:

A junior animator would then fill in the drawings between each pose. These drawings were called "in-betweens."

In-betweening is seen as lower-skilled work. Often, in-betweening tasks were offshored from the United States to other countries where labour was less expensive.

Sometimes this approach to animation is called "pose-to-pose."

Computer animation has borrowed these concepts from classical animation. 

If we have a Symbol Instance on the Stage, AniCraft is remembering a number of different things about it:

position

rotation

scale

colour effect

On a different Frame on the timeline, we can change one or all of these parameters. But that will change them across the whole span of frames.

We need to specifically tell the computer to remember our changed parameters. We do this by creating a Keyframe.

With a Symbol instance on the Stage, click on a frame cell in the Timeline. To create a Keyframe, either:

press F6

right-click and choose Keyframe from the context menu

click the Keyframe button at the top of the Timeline

The frame visual on the timeline changes to a filled dot.

This can be misleading! Any time the Stage has _stuff_ on it, we see this filled dot. But AniCraft can't animate raw artwork that we haven't converted into a Symbol, because it doesn't know anything about that artwork's position/rotation/scale/colour effect. It doesn't store those values unless the artwork is converted to a Symbol, and we have an Instance of that Symbol on the Stage.

Let's start with an Instance of our red box symbol on the Stage on Frame 1.

Click on Frame 12 and add a Keyframe.

Then, click and drag to move the box across the Stage.

Press Enter or the play button to preview the animation. The box jumps from one side of the stage to the other. This is because, like the classical animation director, we've only "drawn" the key poses. We need to hand the work off to an in-betweener to draw all the positions between those keys!

Let's treat AniCraft like our lower-paid, offshored in-between artist.

The software can calculate the differences between the two Keyframes, and then fill in the blanks from pose to pose to create automatic motion or visual changes. This is called _interpolation_.

To get AniCraft to interpolate between our keyframes, we have to select the first keyframe, or any fame in the range in between the two keyframes. Then either:

right-click and choose Create Classic Tween

select Insert > Create Classic Tween from the menu

choose Create tween > Classic tween from the drop-down at the top of the Timeline

Now, the first Keyframe changes colour, and we see an arrow extend all the way to the next Keyframe.

If we scrub the Timeline by clicking and dragging the Playhead, or if we play our animation by pressing Enter or clicking the Play button, we see the red box Symbol Instance move between the first keyframe position and the next. 

Hooray! We've offshored our in-betweening work to AniCraft!

Try experimenting with the Symbol Instance's position, rotation, scale, and colour effect (check the Properties panel) to see the different parameters AniCraft can interpolate between.
