import react from "react";
import SearchBar from "./SearchBar";
import youtube from "../Apips/youtube";
import VideoList from "./VideoList";
import VideoDetails from "./VideoDetails";

class App extends react.Component{
    state= {videos: [], selectedVideo: null};
    componentDidMount(){
        this.onTermSubmit('buildings');
    }
    onTermSubmit = async term => {
       const response = await youtube.get('/search', {
         params:{
             q: term
         }
        });

     this.setState({
         videos: response.data.items,
         selectedVideo:response.data.items[0]
        });
    };
    onVideoSelect =(video)=> {
        this.setState({selectedVideo: video});
    }
   render(){
       return (
         <div className="ui container">
           <SearchBar ontermsubmit={this.onTermSubmit}/>
           <div className="ui grid">
               <div className="ui row">
                 <div className="eleven wide column">  
                  <VideoDetails video={this.state.selectedVideo}/>
                 </div> 
                 <div className="five wide column">
                  <VideoList onVideoSelect={this.onVideoSelect} video={this.state.videos}/>
                 </div>
                </div>
           </div>
         </div>
        );
   }
}

export default App;