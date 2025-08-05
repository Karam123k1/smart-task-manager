package com.anilaltunkan.security.service;

import com.anilaltunkan.security.model.Project;
import com.anilaltunkan.security.model.Task;
import com.anilaltunkan.security.model.User;
import com.anilaltunkan.security.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> getTasksByAssignee(User user) {
        return taskRepository.findByAssignee(user);
    }

    public List<Task> getTasksByProject(Project project) {
        return taskRepository.findByProject(project);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setStatus(updatedTask.getStatus());
                    task.setDueDate(updatedTask.getDueDate());
                    task.setAssignee(updatedTask.getAssignee());
                    task.setProject(updatedTask.getProject());
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
