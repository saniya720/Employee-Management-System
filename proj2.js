let employees = [
    { id: 101, name: 'Kamala', designation: 'Software Engineer', salary: 10000 },
    { id: 102, name: 'James', designation: 'UI Developer', salary: 25000 },
    { id: 103, name: 'Jhon', designation: 'DB', salary: 15000 }
  ];
  
  function displayEmployees() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';
    employees?.forEach(employee => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.designation}</td>
        <td class="${employee.salary >= 25000 ? 'highlight-green' : employee.salary < 10000 ? 'highlight-red' : ''}">${employee.salary}</td>
        <td>
          <button onclick="deleteEmployee(${employee.id})">Delete</button>
          <button onclick="editEmployee(${employee.id})">Edit</button>
        </td>
      `;
      tbody.appendChild(row);
    });
    updateTotalSalary();
  }
  
  function updateTotalSalary() {
    const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    document.getElementById('totalSalary').innerText = totalSalary.toFixed(2);
  }
  
  function addEmployee() {
    const empId = parseInt(document.getElementById('empId').value);
    const empName = document.getElementById('empName').value;
    const designation = document.getElementById('designation').value;
    const salary = parseFloat(document.getElementById('salary').value);
  
    if (!empName || !designation || !salary) {
      alert('Please fill in all fields.');
      return;
    }
      
  //   if (employees.some(emp => parseInt(emp.id) === empId)) {
  //       alert('Employee ID must be unique.');
  //       return;
  //     }
  
  //   const newEmployee = { id: empId, name: empName, designation, salary };
  //   employees.push(newEmployee);
  //   displayEmployees();
  //   resetForm();
  // }
  const editingId = document.getElementById('editingId').value;

  if (editingId) {
    const index = employees.findIndex(emp => emp.id === parseInt(editingId));
    employees[index] = { id: empId, name: empName, designation, salary };
  } else {
    if (employees.some(emp => emp.id === empId)) {
      alert('Employee ID must be unique.');
      return;
    }

    const newEmployee = { id: empId, name: empName, designation, salary };
    employees.push(newEmployee);
  }

  displayEmployees();
  resetForm();
}

  function resetForm() {
    document.getElementById('empName').value = '';
    document.getElementById('designation').value = 'Software Engineer';
    document.getElementById('salary').value = '';
    document.getElementById('empId').value = getNextEmployeeId();
  }
  
  function getNextEmployeeId() {
    const maxId = employees.reduce((max, emp) => (emp.id > max ? emp.id : max), 0);
    return maxId + 1;
  }
  
  function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    displayEmployees();
  }
  
  function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    document.getElementById('empId').value = employee.id;
    document.getElementById('empName').value = employee.name;
    document.getElementById('designation').value = employee.designation;
    document.getElementById('salary').value = employee.salary;
    
  }
 
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('empId').value = getNextEmployeeId();
    displayEmployees();
  });
  