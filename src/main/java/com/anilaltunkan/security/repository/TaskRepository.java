package com.anilaltunkan.security.repository;

import com.anilaltunkan.security.model.Project;
import com.anilaltunkan.security.model.Task;
import com.anilaltunkan.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignee(User user);
    List<Task> findByProject(Project project);
}
