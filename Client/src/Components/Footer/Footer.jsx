import './style.css'

function Footer(){
    return (
        <div className="bg-primary-color" id="footer-div">
            <div className='row-section' id='top-part'>
                <div className='col-section' id='col1'>
                    <div className='sub-part' id='logo-part'>
                        GETSHIKSHAK
                    </div>
                    <div className='sub-part' id='social-media-part'>
                        <div className='social-media-icon'>
                            f
                        </div>
                        <div className='social-media-icon'>
                            in
                        </div>
                        <div className='social-media-icon'>
                            t
                        </div>
                    </div>
                </div>
                <div className='col-section'>
                    About US
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
                <div className='col-section'>
                    Find A Tutor
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
                <div className='col-section'>
                    Became A Tutor
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
            </div>
            <div className='row-section' id='bottom-part'>
                 GETSHIKSHAK 2023. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer