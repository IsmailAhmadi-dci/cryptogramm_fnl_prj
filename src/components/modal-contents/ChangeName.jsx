import { UserData } from "../../App"
import { useContext, useState } from "react"


export default function ChangeName() {

    const [userData, setUserData, saveData, loadData, openModal, setOpenModal] = useContext(UserData)
    let tempName = '';

    const handleSubmit = (e) => {
        e.preventDefault()
        setUserData(prev => ({...prev, playerName: tempName}))
        setOpenModal(false)
    }

    const handleChange = (e) => {
        tempName = e.target.value
    }

    return (
        <>
            <h2>Changing The Name</h2>
            <p>So you want to change your name {userData.playerName}?</p>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} />
                <input type="submit" value="Change"/>
            </form>

        </>
    )
}