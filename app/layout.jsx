import '@styles/globals.css';
import Navbar from '@components/navbar/Navbar';
import Home from './page';
import Sidebar from '@components/sidebar/Sidebar';
   
const RootLayout = () => {
return (
    <html lang="en" className='h-full'>
        <head>
                  <title>D2 Roll Chaser</title>
        </head>
        <body className='text-center h-full'>
            <Navbar/>
            <main className='app h-full'>  
            <Sidebar/> 
            <Home/>          
            </main>
        </body>
    </html>
)
}

export default RootLayout;