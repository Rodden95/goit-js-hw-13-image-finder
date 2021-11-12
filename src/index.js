// import fetchApi from './fetch'
import { createClient } from 'pexels';
import 'regenerator-runtime/runtime'
import cardsTpl from './partials/cards.hbs'
import cardsTplCopy from './partials/cards_copy.hbs'

import { debounce } from 'lodash';
import { alert, defaultModules, defaults } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});
defaults.delay = 1000;
      
const refs = {
  cardsList: document.querySelector('.gallery'),
  card: document.querySelector('.gallery__item'),
  img: document.querySelector('.img-size'),
  searchForm: document.querySelector('#search-form'),
  searchBtn: document.querySelector('.button'),
  nextBtn:document.querySelector('[data-next]'),
  input: document.querySelector('[data-input]'),
  title: document.querySelector('.title')

}

const getImgFromApi = async (query, page, photos) => {
  const client = createClient('563492ad6f91700001000001d83c2ebc8a0d47d8b28a359bf852bff3');
  
  
  try {
    let response = await client.photos.search({ query, page: page, per_page: photos })
  // console.log(response);
  return response;
  } catch {
    console.log('error');
    alert({
    text: 'alert'
  })
  }

}
refs.nextBtn.addEventListener('click', onPressBtn)
  refs.searchBtn.addEventListener('click', onSearchClick)




  function onSearchClick(e) {
  e.preventDefault()
  refs.title.classList.remove("visible")
    let inputValue = refs.searchForm.firstElementChild.value;
     
    (async () => await getImgFromApi(inputValue, 1, 9))()
      .then(photo => {
        
        if (photo.total_results === 0) {
          alert({text: 'alert onSearchClick'})
          return refs.nextBtn.classList.add('invisible');
        }
        
          let src = {};
        src.person = []
          
          setTimeout(() => {
            try {
          photo.photos.forEach((e) => {
            src.person = [e.src.medium, e.id, e.photographer, e.photographer_url]
          
            refs.cardsList.insertAdjacentHTML('beforeend', cardsTplCopy({ src }))
            
          });
        
        refs.cardsList.addEventListener('click', onMouseOver)

          function onMouseOver(e) {
        
      }

          refs.searchBtn.classList.add('invisible');
          refs.input.classList.add('input-position')
          refs.nextBtn.classList.remove('invisible');
          refs.searchForm.addEventListener('input', debounce(onInput, 500))
          } catch {
            refs.nextBtn.classList.add('invisible');
            alert({text: 'alert'})
          }
          }, 1000);
        })
}


function onInput(e){
  
  
  let inputValue = refs.searchForm.firstElementChild.value;
  (async () => {
    refs.cardsList.innerHTML = '';
  return await getImgFromApi(inputValue,1,  9)
  })().then(photo => {
   if (photo.total_results === 0) {

      alert({
          text: 'alert onInput'
        })
      refs.nextBtn.classList.add('invisible');
      return;
      
  }
  let src = {};
  try {
  if (photo.photos.length !== 0) {
    src.person = []
  // src.push(photoSrc, id, photographer)
  
    // console.log(photo.photos);
    photo.photos.forEach((e, i) => {
     src.person = [e.src.medium, e.id, e.photographer, e.photographer_url]
refs.cardsList.insertAdjacentHTML('beforeend', cardsTplCopy({src}))
    });
    
    
    refs.nextBtn.classList.remove('invisible');
    }
  } catch {
    refs.nextBtn.classList.remove('invisible');
    console.log('error on input');
    
    alert({
    text: 'alert'
  })
  }
  
  // refs.nextBtn.classList.add('invisible');
  
  
  
  
})
}
  let page = 2;

function onPressBtn(e) {
  e.preventDefault();
  
  let inputValue = refs.searchForm.firstElementChild.value;
  page++;
  
  (async () => {
    
  return await getImgFromApi(inputValue, page, 9)
})().then(photo => {
  let src = {};
  src.person = []
  try {
    photo.photos.forEach((e, i) => {
     src.person = [e.src.medium, e.id, e.photographer, e.photographer_url]
refs.cardsList.insertAdjacentHTML('beforeend', cardsTplCopy({src}))
    });


    // console.log(src);
    // console.log(cardsTplCopy({src}));
  } catch {
    refs.nextBtn.classList.add('invisible');
    console.log('errorRRR');
  }
  
      

  
})
  setTimeout(() => {
    // refs.nextBtn.scrollIntoView(true);
    try {
      
      refs.cardsList.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    catch {
      console.log('hi');
      
      }
  }, 500)
}



