import { Switch } from '@headlessui/react';

export default function Userpreference({ msg, enabled, setEnabled }) {
    return (
        <div className="mt-3 ml-2 flex items-center gap-2 bg-black/55  text-white p-1 w-fit">
            <p>{msg}</p>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className="group relative flex h-7 w-14 cursor-pointer p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white">
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
                />
            </Switch>
        </div>
    )
};