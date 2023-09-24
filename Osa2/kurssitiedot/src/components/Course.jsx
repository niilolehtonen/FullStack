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

export default Course