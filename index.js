let myLibrary = [{author:"Tolstoy",title:"Crime and Punishment",noOfPages:"405",hasBeenRead:"Yes"},
                   {author:"Jules Vern",title:"80 days around the world!",noOfPages:"450",hasBeenRead:"Yes"}];

document.querySelector("form").style.visibility = "hidden";	

if(myLibrary.length>0)
   displayLibrary();

function Book(author,title,noOfPages,hasBeenRead) 
{
	this.author = author;
	this.title = title;
	this.noOfPages = noOfPages;
	this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(author,title,noOfPages,hasBeenRead) 
{   validate=(author!="")&&(title!="")&&(noOfPages!="")&&(hasBeenRead!="");
	if(validate)
	{
		const newBook = new Book(author,title,noOfPages,hasBeenRead);
		myLibrary.push(newBook);
	}
    else
		alert("Please fill all fields!");
	
	return validate;
}

function displayLibrary()
{	
	const theLibrary=document.getElementById("library");
	for(let i=0;i<myLibrary.length;i++)
	{
		console.log(myLibrary[i].author+myLibrary[i].title+myLibrary[i].noOfPages+myLibrary[i].hasBeenRead);
		const displayBook=document.createElement("div");
		displayBook.setAttribute("class","aBook");
		const bookAuthor=document.createElement("p");
		const bookTitle=document.createElement("p");
		const bookPages=document.createElement("p");
		const isItRead=document.createElement("p");
		const removeBook=document.createElement("button");
		const readBook=document.createElement("button");
		removeBook.setAttribute("class","removing");
		readBook.setAttribute("class","reading");
		bookAuthor.innerText="Author: "+myLibrary[i].author;
		bookTitle.innerText="Title: "+myLibrary[i].title;
		bookPages.innerText="Pages: "+myLibrary[i].noOfPages;
		isItRead.innerText="Read?: "+myLibrary[i].hasBeenRead;
		removeBook.innerHTML="Remove";
		readBook.innerHTML="Read Status";
		displayBook.appendChild(bookAuthor);
		displayBook.appendChild(bookTitle);
		displayBook.appendChild(bookPages);
		displayBook.appendChild(isItRead);
		displayBook.appendChild(removeBook);
		displayBook.appendChild(readBook);
		theLibrary.appendChild(displayBook);
	}	
	
	const removalButtons=document.querySelectorAll('.removing');
	const readingButtons=document.querySelectorAll('.reading');
	const myBooks=document.getElementsByClassName('aBook');
	for(let j=0;j<removalButtons.length;j++)
	{
	      removalButtons[j].addEventListener("click",function()
								                     {
									                     myBooks[j].remove();
														 myLibrary.splice(j,1);
														 if(myLibrary.length>0)
														{
															removeAllChildren("#library div");
															removeAllChildren("#library");
														}
														displayLibrary();
								                     });
													 
		  readingButtons[j].addEventListener("click",function()
								                     {
														 let state=myBooks[j].childNodes[3].innerHTML;
														 if(state.substr(7,9)==="Yes")
														 {
									                         myBooks[j].childNodes[3].innerHTML=state.replace("Yes","No");
															 myLibrary[j].hasBeenRead="No";
														 }
														 else
														 {
															 myBooks[j].childNodes[3].innerHTML=state.replace("No","Yes");
															 myLibrary[j].hasBeenRead="Yes";
														 }
														 
								                     });												 
	}
}

function removeAllChildren(contain)
{
	const myContainer=document.querySelector(contain);
	let child=myContainer.lastElementChild;
	while (child) 
	{
            myContainer.removeChild(child);
            child = myContainer.lastElementChild;
    }
}


document.querySelector("#addBook").addEventListener("click",function()
															{
																document.getElementById("myForm").addEventListener("submit", function(event)
																															 { 
																																event.preventDefault();
																															 });
																let validate=addBookToLibrary(document.querySelector("#authorName").value,document.querySelector("#title").value,
																                 document.querySelector("#pagesNumber").value,document.querySelector("#hasBeenRead").value);
																if(validate)
																{
																	document.getElementById("myForm").reset();
																	alert("Book was added successfully!");	
																	console.log(myLibrary);	
																	document.querySelector("form").style.visibility = "hidden";	
																	if(myLibrary.length>1)
																	{
																		removeAllChildren("#library div");
																	    removeAllChildren("#library");
																	}
																	displayLibrary();																
																}															
															});
															
document.querySelector("#newBook").addEventListener("click",function()
															{
																document.querySelector("form").style.visibility = "visible";
															});	

													