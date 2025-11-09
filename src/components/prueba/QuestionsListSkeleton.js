"use client";
const items = [
    { id: 1, classes: ["w-1/2", "w-2/5", "w-3/4", "w-1/2"] },
    { id: 2, classes: ["w-3/5", "w-4/5", "w-1/4", "w-1/2"] },
    { id: 3, classes: ["w-1/5", "w-2/5", "w-3/4", "w-3/5"] },
];

export default function QuestionsListSkeleton() {
    return (
        <div>
            <ul role="list" className="space-y-4">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="overflow-hidden flex animate-pulse space-x-4 bg-gray-50 px-6 py-4 shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10"
                    >
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-5 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                {item.classes.map((singleClass, index) => (
                                    <div key={index} className="gap-4 flex">
                                        <div className="size-5 rounded-full bg-gray-200"></div>
                                        <div
                                            className={`h-5 rounded bg-gray-200 ${singleClass}`}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
