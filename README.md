# Move to a new workspace in i3wm

A simple command that moves to the nearest empty workspace in the i3 window manager

## Installation
```
npm i -g i3new
```
## Usage
Run `i3new` or add the following line to your i3 config (~/.config/i3/config) to bind i3new to mod+n
```
bindsym $mod+n exec --no-startup-id i3new
```
