Project Title: SBA 308
Desgined to assist schools in calculating students scores when submitted to the website 

Course Info the numeric id of the course and the course name.
Example:
id: 451
name: "Introduction to JavaScript" 

Assignment Group consists of course assignments that students will submit to the website. This consists of the id associated with the assignment name to the respected course it falls under. The group weight of the assignment group of 25% is based on the assignments learners must submit to "Introduction to JavaScript

Assignment Information specifies the id assocaited with the name of each assignment. In the system the assignment has the following....
    1. Due date
    2. Points Possible a students may score on the assignment

Learners Submission is an array of objects representing each learner. Each learner must submit the assignment under the corresponding course assignment which will also display what time the assignment was submitted. As well as the score recieved

For every day an assignment is submitted late, the learner will be penalized by 10 percent of the points possible for the assignment.

If an assignment is submitted in the wrong group, the user will be notified.

The function getLearnersData will extract the data from the Course Information, Assignment Group, and Learners Submission to calculate the score for each students assignment

newScore will calculate the students final and accumulate the score in respect to the weighted percentage of 25% for "Introduction to JavaScript.

It will print and return the learners average score, as well as letter grade. 

