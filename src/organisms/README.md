# organisms

Organisms are the highest level component that's reusable. They often
wrap one or more molecules and atoms for the purpose of bridging them
and your data layer. E.g. with flux organisms are the controller components
which create actions and subscribe to stores.

They are very coupled to your data layer and are only reusable within
the target domain. An example of an organism would be a wrapper
around a comment box, or a component that takes a user id as a prop
and renders the user's name. They can be large like a login form
or as small as rendering a single word.
