const buttons=document.querySelectorAll("[button-status]")
const form=document.querySelector("#form-search")

if(buttons.length >0){
    buttons.forEach((button) =>{
        button.addEventListener("click",() =>{
            let url=new URL(window.location.href)
    
            const status=button.getAttribute("button-status")
            if(status !=""){
                url.searchParams.set("status",status)
            }
            else{
                url.searchParams.delete("status")
    
            }
            window.location.href=url.href
        })
    })
}

const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = e.target.elements.keyword.value;

    if(value != "") {
      url.searchParams.set("keyword", value);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}



const pagination=document.querySelectorAll("[button-pagination]")
if(pagination.length>0){
  pagination.forEach((button)=>{
    let url = new URL(window.location.href);
    button.addEventListener("click",()=>{
      const page=button.getAttribute("button-pagination")
      url.searchParams.set("page",page)
      window.location.href = url.href;
    })
  })
}



const changeButtons=document.querySelectorAll("[button-change-status]")
if(changeButtons.length>0){
  const formChange=document.querySelector("#form-change-status")
  const path=formChange.getAttribute("data-path")
  
  changeButtons.forEach((button) =>{
    button.addEventListener("click",() =>{
      const statusCurrent = button.getAttribute("data-status")
      const id=button.getAttribute("data-id")
      const statuschange= statusCurrent =="active"?"inactive":"active"
      const action=path+`/${statuschange}/${id}?_method=PATCH`

      formChange.action=action

      formChange.submit()

    })
  })
}
const formChangemulti=document.querySelector("[checkbox-multi]")
if(formChangemulti){
  const checks=formChangemulti.querySelectorAll("input[name='id']")
  const checkall=formChangemulti.querySelector("input[name='checkall']")
  checkall.addEventListener("click",() =>{
    if(checkall.checked){
      checks.forEach((button) =>[
        button.checked=true
      ])
    }
    else{
      checks.forEach((button) =>[
        button.checked=false
      ])
    }
  })

  checks.forEach(button =>{
    button.addEventListener("click",() =>{
      const checkeds=formChangemulti.querySelectorAll("input[name='id']:checked")
      
      if(checkeds.length==checks.length){
        checkall.checked=true
      }
      else{
        checkall.checked=false
      }
    })
  })
}


const formMulti=document.querySelector("[form-change-multi]")

if(formMulti){
  formMulti.addEventListener("submit",(e)=>{
    e.preventDefault()
    var array=[]
    const formChangemulti=document.querySelector("[checkbox-multi]")
    const checkeds=formChangemulti.querySelectorAll("input[name='id']:checked")
    const type=e.target.elements.type.value
    if(type=="delete-all"){
      const confirmdel=confirm("Are you sure to want delete them")
      if(!confirmdel){
        return
      }
    }
    if(type=="change-position"){
      checkeds.forEach(button =>{
      
        const position=button.closest("tr").querySelector("input[name='position']").value
    
        array.push(`${button.getAttribute("value")}-${position}`)
    
    
      })
    }
    else{
      checkeds.forEach(button =>{
         array.push(button.getAttribute("value"))
    
    
      })
    }
    
    
    const input=formMulti.querySelector("input[name='ids']")
    input.value=array.join(", ")
    formMulti.submit()
  
  })
}

const changeDelete=document.querySelectorAll("[button-delete]")

if(changeDelete.length>0){
  const formChange=document.querySelector("#form-delete-item")
  const path=formChange.getAttribute("data-path")
  
  changeDelete.forEach((button) =>{
    button.addEventListener("click",() =>{
      const confirmDelete=confirm("Are you sure to delete this item")
      if(confirmDelete){
      const id=button.getAttribute("data-id")
      const action=path+`/${id}?_method=DELETE`

      formChange.action=action

      formChange.submit()
      }
      

    })
  })
}



const showAlert=document.querySelector("[show-alert]")

if(showAlert){
  const closeAlert = showAlert.querySelector("[close-alert]")
  const time=parseInt(showAlert.getAttribute("data-time")) || 3000
  setTimeout(() =>{
    showAlert.classList.add("alert-hidden")
  },time)
  closeAlert.addEventListener("click",() =>{
    showAlert.classList.add("alert-hidden")
  })
}


const uploadImage=document.querySelector("[upload-image]")

const inputImage=uploadImage.querySelector("[upload-image-input]")
const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")

inputImage.addEventListener("change",(e) =>{
  if(e.target.files.length){
    
    const image = URL.createObjectURL(e.target.files[0])
    
    uploadImagePreview.src = image
  }
})
