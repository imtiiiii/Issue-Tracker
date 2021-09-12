document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
let idCounter = 1;
function submitIssue(e) {
  console.log(e);
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = (id, idNo) => {
  let issues = JSON.parse(localStorage.getItem('issues'));
  let remainingIssues = [];
  remainingIssues = issues.filter(x => {
    if (x.id != id) return x;
  })
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  console.log("id no - > ", idNo);
  document.getElementById(idNo).style.display = 'none';
  // fetchIssues();

}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';


  for (var i = 0; i < issues.length; i++) {
    let temp = idCounter;
    idCounter++;
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well" id="${temp}">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id},${temp})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
