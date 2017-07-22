# Approach
1. Reuse components as much as possible. To this end, the Add Todo and view Existing Todo were refactored into a single wrapper component.
2. The App component fetches the todos on mount.
3. The ExistingTodo and AddTodo components takes care of the update, delete and create operations and passes the result back to the App component, which updates it's state to match the updated results.
