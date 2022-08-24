import React from 'react';
import styles from './Home.module.scss'
import example4 from '../../assets/img/xttGCdR-jpeg-wallpapers.jpg'

export default function home() {
	return (
		<>
			<div className={styles.greenColor}>Hi i'm green</div>
			<div className="test-svg-images"><svg width="16" height="16" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path className="cls-1" d="M512,176.37a157.28,157.28,0,0,1-45.9,111.58l-.19.19-210,205.36L46,288.14c-61.26-61.71-61.26-161.83-.19-223.28A156.1,156.1,0,0,1,255.94,54.16,155,155,0,0,1,355.23,18.5h.06A154.84,154.84,0,0,1,466.1,64.85,157,157,0,0,1,512,176.37Z"/><path className="cls-2" d="M435.18,172.14H396.77a38.45,38.45,0,0,0-38.41-38.41V95.32A76.91,76.91,0,0,1,435.18,172.14Z"/><g className="cls-3"><path className="cls-4" d="M512,176.37a157.28,157.28,0,0,1-45.9,111.58l-.19.19-210,205.36V54.16A155,155,0,0,1,355.23,18.5h.06A154.84,154.84,0,0,1,466.1,64.85,157,157,0,0,1,512,176.37Z"/></g></svg></div>
			<div><img src={example4} /></div>
		</>
		
	)
}
