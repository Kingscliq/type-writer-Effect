const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}
// type Method
TypeWriter.prototype.type = function(){
    // Current Index of words
    
    const current = this.wordIndex % this.words.length;
    // Get full text of Current Word
    const fullText = this.words[current];
    // Check If deleting 
    if(this.isDeleting){
        // Remove a character
        this.txt = fullText.substring(0, this.txt.length - 1);
    }else{
        // Add a character
        this.txt = fullText.substring(0, this.txt.length + 1);

    }
    // Insert Text into Span
    this.txtElement.innerHTML = '<span class="txt">'+ this.txt+'</span>';

    // Starting Type Speed
   let typeSpeed =  300;
   if(this.isDeleting){
        typeSpeed /= 2;
   }
   //If Word is Complete
   if (!this.isDeleting && this.txt === fullText) {
    //Pause at The End  
    typeSpeed = this.wait;
    // Set IsDeleting to true
    this.isDeleting = true;
}else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next Word
    this.wordIndex++;
    //pause before typing
    typeSpeed = 500; 
}


    setTimeout(() => this.type(), typeSpeed);
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init(){
const txtElement = document.querySelector('.type-text');
const words = JSON.parse(txtElement.getAttribute('data-words'));
const wait = txtElement.getAttribute('data-wait');

// Init Typewriter
new TypeWriter(txtElement, words, wait);
}