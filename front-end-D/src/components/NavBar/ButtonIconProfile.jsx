

//Them onClick de logic ung dung
const ButtonIconSetting = ({ icon, iconColor, iconBg, title, desc }) => {
  return (
    <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer" onClick={() => { }}>
      <div
        style={{ color: iconColor, backgroundColor: iconBg }}

        className="text-xl rounded-lg p-3 hover: bg-light-gray"

      >
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  )
}

export default ButtonIconSetting
