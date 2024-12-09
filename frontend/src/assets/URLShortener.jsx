import React, { useState } from 'react';
import './URLShortener.css'; 
const URLShortener = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [copied, setCopied] = useState(false);

    const handleShorten = async () => {
        if (url.trim() === "") {
            alert("Please enter a valid URL!");
            return;
        } try {
            const response = await fetch('http://localhost:9000/api/url-shortener', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            }); const data = await response.json();
            if (response.ok) {
                setShortUrl(`http://localhost:9000/u/${data.token}`);
                setCopied(false);
            } else {
                alert(data.message || "Error generating short URL");
            }
        } catch (error) {
            alert("Failed to connect to the server. Please try again later.");
            console.error(error);
        }
    };
const handleCopy = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl);
            setCopied(true);
        }};
return (
        <div  className='d-flex align-items-center justify-content-center vh-100'
            style={{
                backgroundImage: `url('picture.jpg')`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
            }}
        ><div
                className='card p-4 shadow-lg fade-in'
                style={{
                    maxWidth: '500px',
                    width: "100%",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0)",
                    
                    backdropFilter: "blur(10px)", 
                }}
            >
                <h3 className='text-center mb-4 fw-bold'
                    style={{
                        color: "#55d117",
                        textShadow: '1px 1px 2px #ddd',
                    }}
                >
                    🚀 Dynamic URL Shortener
                </h3>
                <p
                    className='text-center text-muted mb-4'
                    style={{ fontSize: '0.9rem' }}
                >
                    Enter a long URL and get a short, shareable link!
                </p>
                <div className='input-group mb-3'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Paste your URL here'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                            borderRadius: "8px 0 0 8px",
                            border: "2px solid #6a11cb",
                        }} />
                    <button
                        className='btn'
                        onClick={handleShorten}
                        style={{
                            background: '#6a11cb',
                            color: "white",
                            borderRadius: "0 8px 8px 0",
                            fontWeight: "bold",
                            transition: "transform 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Shorten
                    </button>
                </div>
                {shortUrl && (
                    <div className='text-center mt-4 bounce-in'>
                        <p
                            className='text-success fw-bold mb-2'
                            style={{ fontSize: "1rem" }}
                        >
                            Shortened URL:
                        </p>
                        <a
                            href={shortUrl}
                            target='_blank'
                            rel="noopener noreferrer"
                            className='d-block mb-3'
                            style={{
                                textDecoration: "none",
                                color: "#2575fc",
                                fontWeight: "bold",
                            }}
                        >
                            {shortUrl}
                        </a>
                        <button
                            className={`btn btn-outline-primary ${copied ? 'pulse' : ''}`}
                            onClick={handleCopy}
                            style={{
                                borderRadius: '25px',
                                padding: "10px 20px",
                                fontWeight: "bold",
                            }}>
                            {copied ? "Copied! 🎉" : "Copy"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default URLShortener;














