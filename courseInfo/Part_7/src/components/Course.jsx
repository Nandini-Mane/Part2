import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
  // Calculate the total number of exercises
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <strong>total of {total} exercises</strong>
    </div>
  )
}

export default Course
