import { useState } from 'react'
import {  Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

const App = () => {
   const [photos, setPhotos] = useState([])
   const open = url => window.open(url)
   console.log(photos)
  return (
    <div>
      <header>
        <Formik
         inicialValues={{ search: '' }}
         onSubmit={async values => {
           const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
                headers: {
                  'Authorization': 'Client-ID a6kj5XyYwuUrA5Sm7PXaw9GPSP7OsTzP3kSd7qAIAVM'
             }
           })
           const data = await response.json()
           // llamar a api de unsplash
           setPhotos(data.results)
         }}
        >
          <Form>
            <Field  name="search" />
          </Form>

        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
             <article key={photos.id} onClick={() => open(photo.links.html)}>
               <img src={photo.urls.regular} />
               <p>{[photo.description, photo.alt_description].join(' - ')} </p>

             </article>
             ) }

        </div>
      </div>
    </div>
    
  );
}

export default App
