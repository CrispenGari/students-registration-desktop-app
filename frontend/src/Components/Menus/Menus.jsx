import React, { useState } from 'react'

import './Menus.css'
import {Maximize, Fullscreen, FullscreenExit, Close, GroupAdd} from '@material-ui/icons'
const electron = window.require("electron")
const remote = electron.remote
const Menus = () => {
    const [isFullScreen , setIsFullScreen] = useState(false);
    // remote.BrowserWindow.getFocusedWindow().webContents.openDevTools({mode: "bottom"})
    const handleClose =()=>{
        remote.dialog.showMessageBox(remote.getCurrentWindow(),{
            buttons: ["Yes", "No", "Cancel"],
            cancelId: 2,
            defaultId: 0,
            message: "Are you sure you want to close the Student Registration App?",
            title: "Student Registration App",
            checkboxChecked: false,
            checkboxLabel: "Do not ask me again."
          }).then(response=>{
              if(response.response === 0){
                remote.app.quit()
              }else{
                remote.app.focus()
              }
          })
    }
    const handleMinimise =()=>{
        remote.BrowserWindow.getFocusedWindow().minimize();
    }
    const handleFullScreen =()=>{
        if(isFullScreen){
            remote.getCurrentWindow().setFullScreen(!true)
            setIsFullScreen(false)
        }else{
            remote.getCurrentWindow().setFullScreen(true)
            setIsFullScreen(true)
        }
    }
    return (
        <div className="menus">
           <div className="menus__left">
                <GroupAdd/>
           </div>
           <div className="menus__center">
              <h1>Student Registration</h1>
           </div>
           <div className="menus__right">
                <div className="menus__item minimise" title={"minimise"} onClick={handleMinimise}>
                        <Maximize/>
                </div>
                <div className="menus__item toogle-fullscreen" title={isFullScreen? "Exit FullScreen": "Full Screen"} onClick={handleFullScreen}>
                        {
                            !isFullScreen?<Fullscreen/> : <FullscreenExit/>
                        }
                </div>
                <div className="menus__item close" title ={"close"} onClick={handleClose}>
                        <Close/>
                </div>
           </div>
        </div>
    )
}

export default Menus
