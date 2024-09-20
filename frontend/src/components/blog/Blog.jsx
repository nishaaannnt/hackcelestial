import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCode,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Blog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4">
      <Popover className="relative">
        <>
          <Popover.Button
            className="relative text-[#F8BD8D] group md:py-2 py-1 rounded-md lg:inline-flex items-center text-lg font-semibold hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Link to="/blog">
              <span>Blog</span>
            </Link>
            <FontAwesomeIcon
              className={`${isOpen ? "transform rotate-180" : ""} ml-2`}
              icon={faChevronDown}
            />
          </Popover.Button>
        </>
      </Popover>
    </div>
  );
}
