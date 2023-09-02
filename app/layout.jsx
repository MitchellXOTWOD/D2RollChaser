import '@styles/globals.css';
import { Children } from 'react';
import Navbar from '@components/Navbar';
   
const RootLayout = ({children}) => {
return (
    <html lang="en">
        
        <body>
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