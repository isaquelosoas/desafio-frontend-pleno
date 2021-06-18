$( document ).ready(function() {
  console.log('⚡ CustomJS Started');
  fetch('http://localhost:3333/chart/tracks')
  .then(response=>{
    if(response.ok){      
      response.json().then(res=>{
        const tracks = res.tracks.data
        listTracks(tracks)
      })
    }
    else{
      showAlert("Ops! Houve um erro durante a solicitação")
    }    
  })
  .catch(e=>{
    showAlert(`Ops! Erro no servidor ${e}`)
  })
  $("#submit").on("click", ()=>{
    !$("#search").val()?goBackInitialTracks():searchForTracks($("#search").val())
    
  })
  $("form.search").on("submit",(e)=>{
    e.preventDefault()
    !$("#search").val()?goBackInitialTracks():searchForTracks($("#search").val())
  })
});
function listTracks(tracks){ 
  $("#song_list").empty()   
  console.log(tracks)
  if(tracks.length >0){
    tracks.map(track=>{ 
      const minutes = Math.floor(track.duration/60)
      const seconds = Math.ceil(track.duration % 60)      
      const duration =  `${minutes}:${seconds<10?`0${seconds}`:seconds}`
      $("#song_list").append(`
      <li>
        <a href=${track.link} target="__blank">
        <img src="${track.album.cover}"/>
        <div>
          <h2>${track.title}</h2>
          <h3>${track.artist.name}</h3>           
        </div> 
        <span>${duration}</span>
        </a>
      </li>
      `)       
    })
  }
  else{
    showAlert("Nenhum resultado encontrado")
  }
    
}
function searchForTracks(q) {
  $("#song_list").empty()
  $("#song_list").append("<li class='loading'></li>")
  fetch(`http://localhost:3333/search?q=${q}`)
  .then(response=>{
    if(response.ok){
      response.json().then(res=>{
        const tracks =  res.data
        listTracks(tracks)
      })
    }
    else{
      showAlert("Ops! Houve um erro durante a solicitação")
    }   
  })
  .catch(e=>{
    showAlert(`Ops! Erro no servidor ${e}`)
  })
}
function showAlert(text){
  $("#song_list").empty()
  $("#song_list").append(`<div class='alert alert-danger' role='alert'>${text}</div>`)
}
function goBackInitialTracks() {
  $("#song_list").empty()
  $("#song_list").append("<li class='loading'></li>")
  fetch('http://localhost:3333/chart/tracks')
  .then(response=>{
    if(response.ok){      
      response.json().then(res=>{
        const tracks = res.tracks.data
        listTracks(tracks)
      })
    }
    else{
      showAlert("Ops! Houve um erro durante a solicitação")
    }    
  })
  .catch(e=>{
    showAlert(`Ops! Erro no servidor ${e}`)
  })   
}