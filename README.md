Yes — in a 40–45 minute interview, you should:

Build a simple, working solution first

Keep state local

Avoid Context unless it becomes obviously necessary

Explain out loud how you would refactor if you had more time

They are grading:

Can you ship something that works?

Do you know why you’d choose Context vs local state?

Can you reason about tradeoffs under time pressure?

Can you communicate decisions clearly?

Step 1 (first 10–15 minutes): Make it work

- Fetch the data and setData for dogs
- Have two pieces of data: currentIndex and dogs
- extract your current dog
- display UI

Step 2 (next 10–15 minutes): Add comments + votes locally

Step 3: Ask what is next priority: styling to match png or Extract components (one by one)

### Possible Future Refactors

- Abstracting the dog image, comment input, and comment list
  – Loading Skeleton
  – Event Listeners for Key Pressing for keyboard navigation to goForward and goBack
  – use useCallback with page as a dependency and callback function is the logic
  – With abstraction, throw state values in context to allow components to pull from context
  - ✅ Immutable state update (if not already fixed)
    – Disable submit on empty comment

2️⃣ Add one micro-UX improvement (2 minutes)

This is small but powerful.

Examples:

Show comment count

“No comments yet” placeholder

Loading state per image

Disable buttons when loading

This shows:

“I think about users, not just code.”

Final recommendation (memorize this)

In a 40–45 min interview:

✅ Working app first

✅ Local state

✅ Clear data model

✅ Explain future refactors verbally

❌ Avoid Context unless necessary

What NOT to do in this interview ❌

❌ Redux

❌ Multiple contexts

❌ Perfect folder structure

❌ Premature abstraction

❌ “Let me refactor everything first”
