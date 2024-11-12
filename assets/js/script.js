// Create a note class
class Note{
    constructor(id,title,text){
        this.id= id;
        this.title=title;
        this.text=text;
    }
}

// Define the App class to manage the notes
class App{
    constructor(){
        this.notes=[]; //Initialize an empty array to store notes
        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector(".note-title");
        this.$noteText = document.querySelector(".note-text");
        this.$notes= document.querySelector(".notes"); 
        this.$form= document.querySelector("#modal-form"); 
        this.$modal= document.querySelector(".modal"); 

        this.addEventListener();
        this.displayNotes();
              

    }
    addEventListener(){
        // Add a click event listener to the body of the document
        document.body.addEventListener("click", (event)=>{
            // When a click event occurs,call the handleFormClick method
            this.handleFormClick(event);
            this.openModal(event);
        })
        this.$form.addEventListener("submit", (event)=>{
            event.preventDefault();// Prevents the page/browser from refreshing
            const title=this.$noteTitle.value;
            const text=this.$noteText.value;
            this.addNote({title, text})
            this.closeActiveForm();
        })
    }
    handleFormClick(){
      const isActiveFormClickedOn= this.$activeForm.contains(event.target);
      const isInactiveFormClickedOn= this.$inactiveForm.contains(event.target);

      const title= this.$noteTitle.value;
      const text= this.$noteText.value;

      if(isActiveFormClickedOn){
        // Calling the function to open the active form
        this.openActiveForm();
      }else if(!isActiveFormClickedOn && !isActiveFormClickedOn){
        // Calling the function to add the new note
        this.addNote({title, text})
        // Calling the function to close the active form
        this.closeActiveForm();
      };
    };

    openModal(event){
        if(event.target.closest(".note")){
            this.$modal.classList.add("open-modal")
        };
    };
    openActiveForm(){
        this.$activeForm.style.display="black";
        this.$inactiveForm.style.display="none";
        this.$noteText.focus();
    };
    closeActiveForm(){
        
        this.$activeForm.style.display="black";
        this.$inactiveForm.style.display="none";

    }
    // Method to add a new note to the notes
    addNote({title,text}){
        if(text !=""){
            const newNote = new Note(cuid(),title, text)
            this.notes = [...this.notes, newNote]; // Add the note to the notes array

            this.displayNotes();
        };
    };
    // Method to edit an existing note to the notes 
    editNote(id, {title,text}){
        this.notes= this.notes.map(note=>{
            if(note.id===id){
                note.title=title;
                note.text=text;
            }
            return note;
        });
    };
    // Method to delete a note
    deleteNote({id}){
       this.note=this.note.filter(note=> note.id !==id);// Remove the note from the array
    };
    // Method to display a note
    displayNotes(){
        this.$notes.innerHTML =this.notes.map(
        (note)=>
        `
        <div class="note" id="${note.id}">
                    <div class="note-content">
                        <div class="note-header">
                            <p>${note.title}</p>
                            <span class="material-symbols-outlined note-pin">Keep</span>
                        </div>
                <p>${note.text}</p>
                    </div>
                    
            <div class="note-footer-icons">
            <span class="material-symbols-outlined footer-icon">add_alert</span>
            <span class="material-symbols-outlined footer-icon">person_add</span>
            <span class="material-symbols-outlined footer-icon">palette</span>
            <span class="material-symbols-outlined footer-icon">image</span>
            <span class="material-symbols-outlined footer-icon">archive</span>
            <span class="material-symbols-outlined footer-icon">more_vert</span>
                </div>
                </div>

        `    
        );

    };
};

const app = new App();