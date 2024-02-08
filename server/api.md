What do I have to do:

- Thing about uniquness of all fields
- Do all routers

```http
  + GET /processes
  + GET /processes/:id
  + POST /processes
  + PUT /processes/:id
  DELETE /processes/:id

  <!-- POST /processes/:id/migration
  {
    chilrenId: number
    formerParent: number
  } -->

  + GET /processes/:id/children
  + POST /processes/:id/children

  + GET /employees
  + GET /employees/:id
```

```ts
interface Employee {
  id: number
  name: string
  position: string
  department: string
  isAnalyst: boolean
}

interface Process {
  id: number
  name: string
  exitFromProcess?: string
  VDlink?: string
  status?: string
  processOwner?: Employee
  analyst?: Employee
}

interface ProcessRelation {
  id: number
  parent: Process
  child: Process
}
```

Name is unique field

## Questions:

1. When we delete a process, all its children are deleted automatically along with it. Am I right?
2. Can we edit all fields in a process?
3. Are there any other useful endpoints which I skipped?

## Answers:

1. Yes
2. Yes
3. No for now


