# molecules

Molecules are a level above atoms. They represent more specific patterns that
may be tied to the domain of your application, while remaining highly reusable.
Examples of molecules include a comment component, form fields that validate
based on your business rules, or a table abstraction.

They communicate by props only. If they need access to other data, or
to perform actions, wrap them in an organism which provides what they need
via props.
