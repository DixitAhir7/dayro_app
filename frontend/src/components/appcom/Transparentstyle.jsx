function Transparentstyle({ icon, text }) {
    return (
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <span className="text-xl">{icon}</span>
            <span className="text-sm">{text}</span>
        </div>
    );
};

export default Transparentstyle;