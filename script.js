// The provided course information.
const CourseInfo = {
    id: 451, //id: Numeric ID of the course 
    name: "Introduction to JavaScript" //Name of the course
  };
    
    // The provided assignment group.
    const AssignmentGroup = {
      id: 12345, // 
      name: "Fundamentals of JavaScript", //Name of the assignment group 
      course_id: 451, // ID of the associated course
      group_weight: 25, // Weight of the assignment group as a percentage 
      assignments: [
        {
          id: 1,
          name: "Declare a Variable", // Name of the assignment
          due_at: "2023-01-25", // Due date of the assignment
          points_possible: 50 // Points possible for the assignment
        },
        {
          id: 2,
          name: "Write a Function", // Name of the assignment
          due_at: "2023-02-27", // Due date of the assignment
          points_possible: 150 // Points possible for the assignment
        },
        {
          id: 3,
          name: "Code the World", // Name of the assignment
          due_at: "3156-11-15", // Due date of the assignment
          points_possible: 500 // Points possible for the assignment
        }
      ]
    };
    
     // Provided learner submission data. 
    const LearnerSubmissions = [
      {
        learner_id: 125, // Numeric ID of the learner 
        assignment_id: 1, // Numeric ID of the assignment
        submission: {
          submitted_at: "2023-01-25", //on-time
          score: 47  // SCORE: 47/50
        }
      },
      {
        learner_id: 125, //Numeric ID of the learner 
        assignment_id: 2, //Numeric ID of the assignment
        submission: {
          submitted_at: "2023-02-12", //on-time
          score: 150 //SCORE: 150/150
        }
      },
      {
        learner_id: 125, //Numeric ID of the learner 
        assignment_id: 3, //Numeric ID of the assignment
        submission: {
          submitted_at: "2023-01-25", //on-time
          score: 400 //SCORE: 400/500
        }
      },
      {
        learner_id: 132, //Numeric ID of the learner 
        assignment_id: 1, //Numeric ID of the assignment
        submission: {
          submitted_at: "2023-01-24", // on-time
          score: 39 // SCORE: 39/50
        }
      },
      {
        learner_id: 132, //Numeric ID of the learner 
        assignment_id: 2, //Numeric ID of the assignment
        submission: {
          submitted_at: "2023-03-07", // Latest submission
          score: 140 // SCORE: 140/500
          //user_id 132 did not submit third assignment.
        }
      }
    ];
  
    const submittedLate=(dueDateOn,dateSubmittedOn )=>{
      const dueDate = new Date(dueDateOn);
      const dateSubmitted = new Date(dateSubmittedOn);
      
      // What if a value we're expecting to be a number is instead a string?
      // Use try/catch and other logic to handle these types of errors gracefully.
          try {
              if(isNaN(dueDate.getTime()) || isNaN(dateSubmitted.getTime)){
              }
          } catch (error) {
              console.log("Error: ", error.message);
          }
          return dueDate < dateSubmitted 
          
        }
  
    //10 percent dedcuction per day late. 0 lowest score. 
  const calculateTheScore=(learnerSubmission,assignment, lateDeduction)=>{
      const maximumScore = assignment.points_possible;
      let score = learnerSubmission.score;
      if(lateDeduction){
          score = Math.max(score - (0.1 * maximumScore),0) 
      }
  
      return score/maximumScore
    }
    //If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid.
    const courseAssignmentValidation = (courseInfo, assignmentGroup) => {
      if (courseInfo.id !== assignmentGroup.course_id) {
        throw Error("Invalid Input: Wrong assignment group submission");
      }
      console.log("Validated");
    };
  
    function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
      courseAssignmentValidation(courseInfo, assignmentGroup);
      //reduce() is to return the sum of all the elements in an array:
      const learners = learnerSubmissions.reduce((accumulate, learnerSubmission) => {
        //The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
        //Check if id matches the assignment id. 
          const assignment = assignmentGroup.assignments.find(element => element.id === learnerSubmission.assignment_id);
          //Check if due_at matches the assignment due_at
          if (assignment && new Date() >= new Date(assignment.due_at)) {
            //
              const stdId = learnerSubmission.learner_id;
              if (!accumulate[stdId]) {
                  accumulate[stdId] = { id: stdId, finalScore: 0, totalWeight: 0 };
              }
              const late = submittedLate(learnerSubmission.submission.submitted_at, assignment.due_at);
              const newScore = calculateTheScore(learnerSubmission.submission, assignment, late) * assignmentGroup.group_weight;
              accumulate[stdId].finalScore += newScore;
              accumulate[stdId].totalWeight += assignmentGroup.group_weight;
          }
          return accumulate;
      }, {});
  
      // Calculate final average and format result
      //The Object.values() static method returns an array of a given object's own enumerable string-keyed property values.
      //The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.
  
      //  const number1 = 4.954848;
      // const number2 = 5.9797;
      // console.log(Math.floor((number1 / number2) * 100));
      return Object.values(learners).map(learner => {
          const averageScore = 0 < learner.totalWeight ? 
          (learner.finalScore / learner.totalWeight) * 100 : 0;
          console.log("Student ID: ", learner.id, 
  
          // if (averageScore > 100) {
          
        // toFixed() is a Number method that is used to format a number using fixed-point notation. toFixed() formats a number to a given length after the decimal point by rounding off to reduce the length or by adding zeros to increase the length.
          
          "Average Score: ",averageScore.toFixed(2) + "%");
          
          return {
              id: learner.id,
              averageScore: averageScore
          };
      });
  }
  console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
  
  try {
      courseAssignmentValidation(CourseInfo, AssignmentGroup);
  } catch (error) {
      console.error(error.message);
  }
  