import { action, computed, observable, runInAction } from "mobx"
import axios from 'axios'


class Store {
  @observable processe;
  @observable OwnerName;
  @observable newTask;
  @observable chartData;
  @observable dataFromMongo

  @observable TaskNameTarget;
  @observable OwnerNameTarget;
  @observable StartDateTarget;
  @observable EndDateTarget;

  @observable ownerList;
  @observable ownerTarget;
  @observable displayOpen
  @observable displayOpenTable
  @observable displayOpenConfig

  @observable CategoryFertig
  @observable CategoryStartTarget
  @observable CategoryEndTarget
  @observable CategoryLabelTarget
  @observable CategoryList



  constructor() {
    this.processe = [];
    this.OwnerName = [];
    this.newTask = [];
    this.dataFromMongo = [];
    this.ownerList = [];
    this.ownerTarget= '';

    this.TaskNameTarget = '';
    this.OwnerNameTarget = '';
    this.StartDateTarget = '';
    this.EndDateTarget = '';

    this.CategoryStartTarget = '';
    this.CategoryEndTarget = '';
    this.CategoryLabelTarget = '';
    this.CategoryList = [];
    this.CategoryFertig = [];
    

    this.go = this.go()
    this.getOwnerList = this.getOwnerList()
    this.getCategory = this.getCategory()

    this.displayOpen = false;
    this.displayOpenTable = false;
    this.displayOpenConfig = false;
    this.displayOpenEdit = false;

    this.chartData = {}
  }

  @action go() {
    axios.get('http://localhost:4000/chart')
      .then(res => {
        this.dataFromMongo = res.data
        console.log('getting data')
        let newLabel = {}
        let newTask = {}
        let newOwner = {}
        res.data.map(item => {
          return newLabel = {
            label: item.TaskName
          },

            newTask = {
              start: item.StartDate,
              end: item.EndDate
            },

            newOwner = {
              label: item.OwnerName
            },

            this.processe.push(newLabel),
            this.newTask.push(newTask),
            this.OwnerName.push(newOwner)
            
        })


        this.chart = {
          dateformat: "yyyy-mm-dd",
          caption: "42 dp",
          subcaption: "Gantt chart",
          theme: "fusion",
          canvasBorderAlpha: "40"
        }
        
        this.datacolumn = [
          {
            headertext: "Owner",
            headervalign: "bottom",
            headeralign: "left",
            align: "left",
            text: this.OwnerName
          }
        ]

        this.category = this.CategoryFertig

        this.processes = {
          fontsize: "16",
          isbold: "2",
          align: "left",
          headertext: "Tasks",
          headervalign: "bottom",
          headeralign: "left",
          process: this.processe
        }

        this.chartData = {
          type: 'gantt',
          width: 1400,
          height: 500,
          dataFormat: 'json',
          dataSource: {
            chart: this.chart,
            datatable: {
              headervalign: "bottom",
              datacolumn: this.datacolumn
            },
            categories: [{
              category:  this.category
            }],
            processes: this.processes,
            tasks: {
              color: "#5D62B5",
              task: this.newTask
            }
          }
        }
      })

      
  }

  @action getOwnerList() {
    axios.get('http://localhost:4000/owner')
      .then(res => {
        this.ownerList = res.data
      })
  }

  @action getCategory() {
    axios.get('http://localhost:4000/category')
    .then( res => {
      console.log(res.data)
      this.CategoryList = res.data
      let newCategory = {}
      res.data.map(item => {
        newCategory = {
                  start: item.start,
                  end: item.end,
                  label: item.label
                },  
      this.CategoryFertig.push(newCategory)
      this.chart = {
        dateformat: "yyyy-mm-dd",
        caption: "42 dp",
        subcaption: "Gantt chart",
        theme: "fusion",
        canvasBorderAlpha: "40"
      }
      
      this.datacolumn = [
        {
          headertext: "Owner",
          headervalign: "bottom",
          headeralign: "left",
          align: "left",
          text: this.OwnerName
        }
      ]

      this.category = this.CategoryFertig

      this.processes = {
        fontsize: "16",
        isbold: "2",
        align: "left",
        headertext: "Tasks",
        headervalign: "bottom",
        headeralign: "left",
        process: this.processe
      }

      this.chartData = {
        type: 'gantt',
        width: 1400,
        height: 500,
        dataFormat: 'json',
        dataSource: {
          chart: this.chart,
          datatable: {
            headervalign: "bottom",
            datacolumn: this.datacolumn
          },
          categories: [{
            category:  this.category
          }],
          processes: this.processes,
          tasks: {
            color: "#5D62B5",
            task: this.newTask
          }
        }
      }    
      })
      
    })
  }


  @observable Test = ['Product Team', 'Dev', 'Design', 'Vlad']

  @computed get plus() {
    return this.Test[2] + this.Test.length
  }
  // @computed get displayHandle() {
  //   return this.displayOpen = true
  // }
}

const store = new Store()
export default store