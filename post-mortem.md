#### Approach and Process

1. What in my process and approach to this project would I do differently next time?
- I did not use MVC this project as I wanted to use something I'm more familiar with to make sure that it runs properly.
1. What in my process and approach to this project went well that I would repeat next time?
- Learning that using a react component for codes/links that are repeated through several files is much easier/convenient than copy pasting it in every single file (layout.jsx)

#### Code and Code Design

1. What in my code and program design in the project would I do differently next time?
- Did not quite get the design to look like how I intended from the start.

1. What in my code and program design in the project went well? Is there anything I would do the same next time?
- Found out I can use multiple conditions for checking in sql queries, as well as being able to sort the result by multiple parameters.
In this case it will arange the result by time_completed first then by the urgency.
`const queryString = "SELECT * FROM list where user_id = $1 order by time_completed desc,urgent desc;"`

  For each, please include code examples.
  1. Code snippet up to 20 lines.
  2. Code design documents or architecture drawings / diagrams.

#### WDI Unit 2 Post Mortem
1. What habits did I use during this unit that helped me?
- Pseudo-coding helped me visualize what I need to do.

2. What habits did I have during this unit that I can improve on?
- Staying focused and not get distracted, commit more often.

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)
- MVC feel very unfamiliar to me so I feel that I need more time understanding how to manipulate it properly.