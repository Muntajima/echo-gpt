'use client';
import React, { useState } from 'react'
import logo from '../../../../public/echoLogo.jpeg'
import Image from 'next/image';

export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);

    const sendMessage = async () => {
        if (!input.trim())
            return;

        const newMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages([...messages, newMessage]);
        setHistory([...history, input]);
        setInput('');

        // const userMessage = { id: Date.now(), text: input, sender: 'user' };
        // setHistory([...history, input]);
        // const apiKey = process.env.ECHOGPT_API_KEY;

        // const res = await fetch('/api/chat', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'Authorization': `Bearer ${apiKey}`
        //     },
        //     body: JSON.stringify({
        //         message: input, history
        //     }),
        // })

        // if (!res.ok) {
        //     throw new Error(`HTTP error! Status: ${res.status}`);
        // }

        // const text = await res.text(); // Read response as text first

        // if (!text.trim()) {
        //     throw new Error('Empty response from server');
        // }

        // const data = JSON.parse(text); // Parse safely

        // if (data.reply) {
        //     const botMessage = { id: Date.now() + 1, text: data.reply, sender: 'bot' };
        //     setMessages((prev) => [...prev, botMessage]);
        // }
    }




    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     const botMessage = {id: Date.now() + 1, text: data.reply, sender: 'bot'}
    //     setMessages((prev) => [...prev, botMessage]);
    // })
    // .catch(error => console.error('Error:', error));

    // const text = await res.text(); // Read response as text first

    // if (!text.trim()) {
    //     throw new Error('Empty response from server');
    // }

    // const data = JSON.parse(text); // Parse safely

    // if (data.reply) {
    //     const botMessage = { id: Date.now() + 1, text: data.reply, sender: 'bot' };
    //     setMessages((prev) => [...prev, botMessage]);
    // }


return (
    <div className="flex h-screen">
        {/* History Panel */}
        <div className="w-1/4 p-4 bg-gray-200 overflow-y-auto">
        <Image src={logo} alt='echogpt logo' className='w-12 h-12'/>
            <h2 className="text-xl font-bold my-4">EchoGPT History</h2>
            <ul>
                {history.map((msg, index) => (
                    <li key={index} className="p-2 bg-white mb-2 rounded shadow">{msg}</li>
                ))}
            </ul>
        </div>

        {/* Chat Panel */}
        
        <div className="w-3/4 flex flex-col">
        <div className='place-items-center pt-24 space-y-4'>
            <Image src={logo} alt='echogpt logo' className='w-12 h-12 rounded-full'/>
        <h2 className='text-2xl font-semibold'>EchoGPT</h2>
        <p className='w-2/3 text-center text-lg'>Interact with EchoGPT, an AI that reflects your input for quick ideas, summaries, or feedback. Perfect for brainstorming or rapid</p>
        </div>
            <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`p-2 my-2 rounded ${msg.sender === 'user' ? ' bg-purple-100 max-w-[80%] ml-4 pl-8 text-black self-end' : 'bg-gray-300 text-black'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    className="flex-1 p-2 border m-4  rounded-l focus:outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="p-2 m-4 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    </div>
)
}
