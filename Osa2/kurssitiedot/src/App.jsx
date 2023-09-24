const Header = ({ header }) => {
  return (
    <h1> {header} </h1>
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

const App = () => {
  const course = {
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
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App