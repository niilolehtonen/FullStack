const Header = ({ header }) => {
  return (
    <h2> {header} </h2>
  );
}

const Parts = ({ part }) => {
  return (
    <p> {part.name} {part.exercises} </p>
  );
}

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Parts key={part.id} part={part} />
    ))}
  </>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <div>
      <b>total of {totalExercises} exercises</b>
    </div>
  );
}

const Course = ({ course }) => {
    return (
    <>
      <Header header={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
    );
}

const Courses = ({ courses }) => (
  <>
    {courses.map((course) => (
    <Course key={course.id} course={course}/>
    ))} 
  </>  
);

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App