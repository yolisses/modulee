# Monkey

The idea for this module is pretty clear: select a valid editor action, execute
it and check if anything broke. It will be invaluable to catch edge bugs when
handling multiple concurrent users collaboration.

For now it is hard to find names for the parts. I will just call things monkey
and see if something comes up. Like, probably we will need a class for each
editor command, that contains the condition function to be valid (e.g: deleting
a node requires that node). How should we call it? I don't know by now.
