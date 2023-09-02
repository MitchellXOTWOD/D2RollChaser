import '@styles/globals.css';
import Navbar from '@components/Navbar';
   
const RootLayout = ({children}) => {
return (
    <html lang="en">
        <head>
                  <title>D2 Roll Chaser</title>
        </head>
        <body className='text-center'>
            <Navbar/>
            <div className="main"></div>
            <main className='app'>   
            {children}           
            </main>
        </body>
    </html>
)
}

export default RootLayout;