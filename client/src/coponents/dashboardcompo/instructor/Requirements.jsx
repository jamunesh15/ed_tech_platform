import React, { useEffect, useState, useCallback, memo } from 'react'

const MAX_REQUIREMENTS = 10;

const Requirements = memo(({ name, label, register, errors, setValue }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => {
        if (requirementList.length === 0) {
          return "At least one requirement is required";
        }
        return true;
      }
    });
  }, [register, name, requirementList.length]);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList, name, setValue]);

  const handleAddRequirement = useCallback(() => {
    if (requirement.trim()) {
      if (requirementList.length >= MAX_REQUIREMENTS) {
        alert(`Maximum ${MAX_REQUIREMENTS} requirements allowed`);
        return;
      }
      if (requirementList.includes(requirement.trim())) {
        alert("This requirement already exists");
        return;
      }
      setRequirementList(prev => [...prev, requirement.trim()]);
      setRequirement("");
    }
  }, [requirement, requirementList]);

  const handleRemoveRequirement = useCallback((index) => {
    setRequirementList(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRequirement();
    }
  }, [handleAddRequirement]);

  return (
    <div className='flex flex-col gap-2' role="form" aria-label="Course requirements">
      <label htmlFor={name} className="text-richblack-5">
        {label}<sup className='text-pink-200'>*</sup>
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          className='flex-1 bg-richblack-700 p-3 rounded-lg outline-none text-richblack-5 border-b border-richblack-200 focus:border-yellow-50 shadow-[0_1px_0_0] shadow-white/50'
          id={name}
          name={name}
          value={requirement}
          placeholder='Enter Requirement'
          onChange={(e) => setRequirement(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={100}
          aria-label="Add requirement"
        />
        <button
          type="button"
          className='px-4 py-2 text-yellow-100 hover:underline hover:scale-95 font-semibold transition-all'
          onClick={handleAddRequirement}
          disabled={!requirement.trim()}
          aria-label="Add requirement to list"
        >
          Add
        </button>
      </div>

      <div role="list" aria-label="Requirements list">
        {requirementList.length > 0 && (
          <ul className="mt-2 space-y-2">
            {requirementList.map((req, index) => (
              <li key={index} className='flex items-center justify-between p-2 bg-richblack-800 rounded'>
                <span className="text-richblack-5">{req}</span>
                <button
                  type="button"
                  className='text-sm text-richblack-300 hover:text-pink-200 hover:underline transition-all'
                  onClick={() => handleRemoveRequirement(index)}
                  aria-label={`Remove requirement: ${req}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {requirementList.length > 0 && (
        <p className="text-sm text-richblack-300">
          {requirementList.length} of {MAX_REQUIREMENTS} requirements added
        </p>
      )}

      {errors[name] && (
        <span className="text-pink-200 text-sm" role="alert">
          {errors[name].message || "This field is required"}
        </span>
      )}
    </div>
  );
});

Requirements.displayName = 'Requirements';

export default Requirements;