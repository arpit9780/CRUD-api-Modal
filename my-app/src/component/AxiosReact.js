import axios from 'axios'
import  React, { Component } from 'react'
import {Modal} from '@mantine/core'

 class AxiosReact extends Component {
     constructor(){
      super();
      this.state={
      user:[],
      name:'', // Add Name
      updateName:"",  // Update Name
      opened:false,
      img:'',
      upId:"",
  }
  this.handleUpdate= this.handleUpdate.bind(this)
}   
componentDidMount(){
     return( axios.get("https://62d168bcd4eb6c69e7dcdea3.mockapi.io/users")
    .then((response) => {
            console.log(response.data)
            this.setState({user:response.data})
           
        }))
    }
    handleChange=event=>{
      this.setState({name:event.target.value})
     console.log(event)
    }

    handleSubmit=()=>{
    const person={
       name:this.state.name,
    }
    
    axios.post(`https://62d168bcd4eb6c69e7dcdea3.mockapi.io/users`,person)
    .then((response) => {
      console.log(response.data)
      
     }) 
        let newPost = {}
        newPost.id = this.state.user.length + 1
        newPost.name = this.state.name
        this.state.user.push(newPost)
        console.log(newPost)
        this.setState({ user: this.state.user })
       alert("Succesfully Add")
    }

    deleteId=(dell)=>{
      axios.delete(`https://62d168bcd4eb6c69e7dcdea3.mockapi.io/users/${dell}`)
      .then((response) => {
        console.log(response.data)
      })

      const filterdata = this.state.user.filter((item)=>{
        if(item.id !== dell){
          return item
        } 

      })
      this.setState({user:filterdata})
      // this.setState({user:this.state.user.filter((item)=>{return item.id !== dell})})
    } 

    handleUpdate(e){
      this.setState({updateName : e.target.value})
    }   

    updateUser = (id,name) => {

      this.setState({updateName : name})
      let body ={name : this.state.updateName}
      axios.put(`https://62d168bcd4eb6c69e7dcdea3.mockapi.io/users/${id}`,body)
     .then((response) => {
       console.log(response.data)
     })
      
     const updatePost = this.state.user.find((item) => item.id === id)
     updatePost.name = this.state.updateName
      console.log(6666,updatePost);
     const filterdata = this.state.user.filter((item)=>{
      if(item.id === id){
        return updatePost
      }
    else {
      return item
    } 
    })
      console.log(8888,filterdata);
      this.setState({user:filterdata})
//      return item.id != dell
    }
     
    onClickButton=(id,name,image)=> {
     
      this.setState({updateName : name,img:image,upId:id})
      this.setState({opened:true});
     
     console.log(444,this.state.img);

    }
  
    onCloseModal=()=> {
      this.setState({opened:false})
    }
    
    updateModal=(id)=>{
     
      let body ={name : this.state.updateName}
      axios.put(`https://62d168bcd4eb6c69e7dcdea3.mockapi.io/users/${id}`,body)
     .then((response) => {
       console.log(response.data)
     })
      
     const updatePost = this.state.user.find((item) => item.id == id)
     updatePost.name = this.state.updateName
      console.log(6666,updatePost);
     const filterdata = this.state.user.filter((item)=>{
      if(item.id == id){
        return updatePost
      }
    else {
      return item
    } 
    })
    this.setState({user:filterdata}) 
    this.setState({opened:false})

    }
    render(){
     
    return (
        <>
         {this.state.opened? 
         <><Modal
         opened={this.state.opened}
         onClose={this.onCloseModal}
        
        ><center>
        <h1>Please Update Name</h1>
        <img src={this.state.img} alt="..." class="img-thumbnail"></img> <br />
        <input value={this.state.updateName} onChange={(e)=>this.handleUpdate(e)}/>
        <button onClick={() => this.updateModal(this.state.upId)}>Update</button>
        <button onClick={this.onCloseModal}>Exit</button>
        </center>
        </Modal></>   :  null   } 
         
            <div className='container my-3'>
                <div className="row">
                    <div className="col-4">
                    </div>
                </div>
            </div>
          
          <div><center>
               <input type="text"  name="name" onChange={this.handleChange}/>
               <button onClick={this.handleSubmit}>Add Post</button>
               <br />
               </center>
               </div>

          <div>
                        <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Process</th>
                          </tr>
                        </thead>
                       
                        {
                this.state.user?.map((value,i)=>{
                    return(
                      <tbody>
                          <tr key={i}>
                            <th scope="row">{value.id}</th>
                            <td>{value.name}</td>
                            <img src={value.avatar} alt="..." class="img-thumbnail"></img>
                            <td><button type="number" onClick={()=>this.deleteId(value.id)}>Delete</button> 
                            <br />
                            {/* <button onClick={() => this.editName(value.id,value.name)}>Edit</button> */}
                            {/* <button onClick={() => this.updateUser(value.id,value.name)}>Update</button> */}
                            <button onClick={() => this.onClickButton(value.id,value.name,value.avatar)}>Edit Via Modal</button>
                            </td>
                          </tr>
                        </tbody>)})}
                      </table>
                
               </div>
                   
        </> )
    }
  }

  export default AxiosReact

//className
//Img /
//style={{width: "18rem;"}}