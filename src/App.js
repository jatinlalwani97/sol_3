import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import Navbar from './Navbar';
import './App.css';
import './styles.css';

class App extends Component {
  state = {
    empList: [
      {
        empName: 'jatin',
        empAge: 20,
        empDesignation: 'Account',
        empAvailable: true,
        empGender: 'Male',
        empDepartment: 'Testing',
        empDoj: '01/01/2002',
        empOrder: 1,
      },
    ],
    newEmp: { empOrder: 1, empAvailable: true },
    modalData: [],
    totalEmp: 1,
    availbleEmp: 1,
    index: 0,
  };
  findModalData = (index) => {
    this.setState({ modalData: this.state.empList[index], index: index });
  };

  addNewEmp = () => {
    // this.setState({newEmp:{}})
    this.setState({
      newEmp: {},
      empList: [...this.state.empList, this.state.newEmp],
      availbleEmp: this.state.availbleEmp + 1,
      totalEmp: this.state.totalEmp + 1,
    });
  };

  empNameChange = (index, e) => {
    console.log('index ', e.target.value);
    let value = e.target.value;
    this.setState((prevState) => {
      let newEmp = prevState.newEmp;
      newEmp[index] = value;
      return { newEmp };
    });
  };

  compare(a, b) {
    console.log(a, b);

    const bandA = a.empOrder;
    const bandB = b.empOrder;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }

  sortEmp = () => {
    console.log('in log');
    let data = this.state.empList.sort(this.compare);
    this.setState({ empList: data });
  };

  onEditIndex = (index) => {
    this.setState({ index: index });
  };

  empAvailableChange = (index, e) => {
    setTimeout(
      function () {
        this.sortEmp();
      }.bind(this),
      3000
    );
    console.log(e.target.checked);
    let value = e.target.checked;
    var order = 0;
    if (value == true) {
      order = 1;
    } else {
      order = 0;
    }
    // console.log("value ",value)
    this.setState((prevState) => {
      let empList = prevState.empList;
      console.log('index ', empList[index].empAvailable);
      empList[index].empAvailable = value;
      empList[index].empOrder = order;
      return { empList };
    });
  };

  editNewEmp = (index) => {
    this.setState((prevState) => {
      let empList = prevState.empList;
      empList[index] = this.state.newEmp;
      return { empList };
    });
  };

  render() {
    console.log('modalData ', this.state.empList);
    return (
      <div className="wrapper">
        {/* <!-- navbar --> */}
        <Navbar />
        {/* <!-- navbar --> */}
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="question-dashboard">
                <div class="card mt-4 mb-3 mb-md-4">
                  <div class="card-body p-3">
                    <h5 class="text-secondary mb-2">
                      Available:{' '}
                      <span class="font-weight-bold ml-1 text-dark">
                        {this.state.availbleEmp}
                      </span>
                    </h5>
                    <h5 class="text-secondary">
                      Total:{' '}
                      <span class="font-weight-bold ml-1 text-dark">
                        {this.state.totalEmp}
                      </span>
                    </h5>

                    <button
                      class="btn btn-primary mt-4"
                      data-toggle="modal"
                      data-target="#addEmployeeModal"
                      type="button"
                    >
                      <i class="fa fa-plus"></i>&nbsp; Add Employee
                    </button>
                  </div>
                </div>

                <div class="table-responsive mt-3 mt-md-4 mb-2">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Available</th>
                        <th>View Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.empList.map((emp, index) => {
                        return (
                          <tr>
                            <td>{emp.empName}</td>
                            <td>{emp.empDepartment}</td>
                            <td>
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                  onChange={(e) =>
                                    this.empAvailableChange(index, e)
                                  }
                                  checked={emp.empAvailable}
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                ></label>
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-outline-info btn-sm"
                                data-toggle="modal"
                                data-target="#editEmployeeModal"
                                onClick={() => this.findModalData(index)}
                              >
                                <i class="fa fa-edit"></i>&nbsp; Edit
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-danger btn-sm"
                              >
                                <i class="fa fa-trash"></i>&nbsp; Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- row --> */}
        </div>
        {/* <!-- Add Employee Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addEmployeeModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addEmployeeModal"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header pt-3 pb-2">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  Add Employee
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-row ">
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="Enter"
                        onChange={(e) => this.empNameChange('empName', e)}
                        // value={this.state.modalData.empName}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Gender
                      </label>
                      <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => this.empNameChange('empGender', e)}
                      >
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Age
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="Enter"
                        onChange={(e) => this.empNameChange('empAge', e)}
                        // value={this.state.modalData.empAge}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="Enter"
                        // value={this.state.modalData.empDesignation}
                        onChange={(e) =>
                          this.empNameChange('empDesignation', e)
                        }
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="Enter"
                        // value={this.state.modalData.empDepartment}
                        onChange={(e) => this.empNameChange('empDepartment', e)}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        id=""
                        placeholder=""
                        // value="hi"
                        onChange={(e) => this.empNameChange('empDoj', e)}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  onClick={this.addNewEmp}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="editEmployeeModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addEmployeeModal"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header pt-3 pb-2">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  Add Employee
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-row ">
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="Enter"
                        onChange={(e) => this.empNameChange('empName', e)}
                        value={this.state.empList[this.state.index].empName}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Gender
                      </label>
                      <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => this.empNameChange('empGender', e)}
                      >
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Age
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="Enter"
                        onChange={(e) => this.empNameChange('empAge', e)}
                        value={this.state.empList[this.state.index].empAge}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="Enter"
                        value={
                          this.state.empList[this.state.index].empDesignation
                        }
                        onChange={(e) =>
                          this.empNameChange('empDesignation', e)
                        }
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id=""
                        placeholder="Enter"
                        value={
                          this.state.empList[this.state.index].empDepartment
                        }
                        onChange={(e) => this.empNameChange('empDepartment', e)}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="" class="mb-1">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        id=""
                        placeholder=""
                        value="hi"
                        onChange={(e) => this.empNameChange('empDoj', e)}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  onClick={() => this.editNewEmp(this.state.index)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
