import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
  // Debug tip: You can uncomment these lines if your code doesn't work
  // console.log('course parts:', course.parts)

  const total = course.parts.reduce((sum, part) => {
    // Debugging log — helps understand what happens on each iteration
    console.log('Accumulating:', sum, part.exercises)
    return sum + part.exercises
  }, 0)

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

export default Course
