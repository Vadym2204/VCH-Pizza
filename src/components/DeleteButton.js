import {useState} from "react";

export default function DeleteButton({label,onDelete}) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div>Ви впевнені, що хочете видалити?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Відмінити
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="primary">
              Так,&nbsp;видалити!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
}